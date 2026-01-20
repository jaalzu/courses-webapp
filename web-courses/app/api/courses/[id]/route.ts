import { NextResponse } from 'next/server'
import { createClient } from '@/shared/lib/supabase/server'
import { courseQueries } from '@/shared/lib/supabase/queries/courses'
// app/api/courses/[id]/route.ts
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