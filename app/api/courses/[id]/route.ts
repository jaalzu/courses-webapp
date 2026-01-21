import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 🛡️ BLOQUEO ADMIN DEMO
  if (user?.email === 'admin@demo.com') {
    return NextResponse.json(
      { success: false, error: "Lo siento, las modificaciones están deshabilitadas en la cuenta de demostración." }, 
      { status: 403 }
    );
  }

  try {
    // 1. Obtener la URL de la imagen antes de borrar el registro
    const { data: course } = await supabase
      .from('courses')
      .select('thumbnail_url')
      .eq('id', id)
      .single();

    const imageName = course?.thumbnail_url;

    // 2. Limpiar tablas relacionadas (Evita errores de Constraint)
    const tables = ['user_progress', 'lessons', 'forum_posts', 'favorites', 'course_access'];
    for (const table of tables) {
      await supabase.from(table).delete().eq('course_id', id);
    }
    
    // 3. Borrar el curso de la DB
    const { error: dbError } = await supabase.from('courses').delete().eq('id', id);
    if (dbError) throw dbError;

    // 4. Borrar imagen física del Storage
    if (imageName) {
      const fileNameToDelete = imageName.includes('/') ? imageName.split('/').pop() : imageName;
      if (fileNameToDelete) {
        const { error: storageError } = await supabase
          .storage
          .from('courses-imgs')
          .remove([fileNameToDelete]);

        if (storageError) console.error('Error de Storage:', storageError);
      }
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error en DELETE:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * PUT: Actualiza los datos de un curso y gestiona el reemplazo de imágenes.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  
  // 🛡️ SEGURIDAD: Obtenemos el usuario antes de procesar el body
  const { data: { user } } = await supabase.auth.getUser();

  // 🛡️ BLOQUEO ADMIN DEMO
  if (user?.email === 'admin@demo.com') {
    return NextResponse.json(
      { success: false, error: "Modificaciones deshabilitadas en modo demo." }, 
      { status: 403 }
    );
  }

  const body = await request.json();

  try {
    // 1. Obtener imagen vieja para no dejar basura en el storage si se cambia
    const { data: oldCourse } = await supabase
      .from('courses')
      .select('thumbnail_url')
      .eq('id', id)
      .single();

    const oldImage = oldCourse?.thumbnail_url;
    const newImage = body.image || body.thumbnail_url;

    // Borrado de imagen antigua si la nueva es diferente
    if (oldImage && newImage && oldImage !== newImage) {
      const fileName = oldImage.includes('/') ? oldImage.split('/').pop() : oldImage;
      if (fileName) {
        await supabase.storage.from('courses-imgs').remove([fileName]);
      }
    }

    // 2. MAPEADOR: Limpieza de campos para evitar inyecciones de columnas inexistentes
    const dbUpdates: any = {};
    
    if (body.title !== undefined) dbUpdates.title = body.title;
    if (body.description !== undefined) dbUpdates.description = body.description;
    if (body.instructor !== undefined) dbUpdates.instructor = body.instructor;
    if (body.is_initial !== undefined) dbUpdates.is_initial = body.is_initial;
    
    // Mapeo de campos Frontend -> Backend
    if (newImage !== undefined) dbUpdates.thumbnail_url = newImage;
    if (body.level !== undefined) dbUpdates.difficulty = body.level;
    if (body.keyPoints !== undefined) dbUpdates.key_points = body.keyPoints; 
    if (body.duration !== undefined) dbUpdates.duration = String(body.duration);

    // 3. Ejecutar actualización
    const { data, error: dbError } = await supabase
      .from('courses')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('API Error en PUT:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}