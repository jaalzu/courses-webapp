import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  try {
    const { data: course } = await supabase
      .from('courses')
      .select('thumbnail_url')
      .eq('id', id)
      .single();

    const imageName = course?.thumbnail_url;

    const tables = ['user_progress', 'lessons', 'forum_posts', 'favorites', 'course_access'];
    for (const table of tables) {
      await supabase.from(table).delete().eq('course_id', id);
    }
    
    const { error: dbError } = await supabase.from('courses').delete().eq('id', id);
    if (dbError) throw dbError;

    if (imageName) {
      const fileNameToDelete = imageName.includes('/') ? imageName.split('/').pop() : imageName;

      const { error: storageError } = await supabase
        .storage
        .from('courses-imgs')
        .remove([fileNameToDelete]);

      if (storageError) {
        console.error('Error de Storage:', storageError);
      } else {
      }
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const body = await request.json(); // Esto trae 'keyPoints', 'image', etc.

  try {
    // 1. Obtener imagen vieja para limpiar storage
    const { data: oldCourse } = await supabase
      .from('courses')
      .select('thumbnail_url')
      .eq('id', id)
      .single();

    const oldImage = oldCourse?.thumbnail_url;
    const newImage = body.image || body.thumbnail_url;

    // Borrado de imagen si cambió
    if (oldImage && newImage && oldImage !== newImage) {
      const fileName = oldImage.includes('/') ? oldImage.split('/').pop() : oldImage;
      await supabase.storage.from('courses-imgs').remove([fileName]);
    }

    // 2.  MAPEADOR: Traducimos de "Frontend" a "Database"
    // Solo incluimos los campos que realmente existen en la tabla
    const dbUpdates: any = {};
    
    if (body.title !== undefined) dbUpdates.title = body.title;
    if (body.description !== undefined) dbUpdates.description = body.description;
    if (body.instructor !== undefined) dbUpdates.instructor = body.instructor;
    if (body.is_initial !== undefined) dbUpdates.is_initial = body.is_initial;
    
    // Mapeos de nombres diferentes:
    if (newImage !== undefined) dbUpdates.thumbnail_url = newImage;
    if (body.level !== undefined) dbUpdates.difficulty = body.level;
    if (body.keyPoints !== undefined) dbUpdates.key_points = body.keyPoints; // ⬅️ AQUÍ ESTABA EL ERROR
    if (body.duration !== undefined) dbUpdates.duration = String(body.duration);

    // 3. Ejecutar el update con el objeto LIMPIO
    const { data, error: dbError } = await supabase
      .from('courses')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, data });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}