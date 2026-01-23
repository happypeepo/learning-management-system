import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Params are Promises in Next 15+
) {
  const { id } = await params

  try {
    const supabase = await createClient()

    // Fetch course with lessons ordered by index
    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        *,
        lessons (
          *,
          quiz_questions (*)
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Sort lessons manually if needed (Supabase can also order but nested ordering syntax is complex)
    // .order('order_index', { foreignTable: 'lessons', ascending: true }) // Easier to sort in JS sometimes
    if (course.lessons) {
      course.lessons.sort((a: any, b: any) => a.order_index - b.order_index)
    }

    return NextResponse.json(course)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}