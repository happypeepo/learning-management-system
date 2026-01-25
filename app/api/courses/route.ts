import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    let query = supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)

    if (category) {
      // Handle mapping or normalization if needed
      // Normalizing slugs (e.g. 'web-dev' -> 'Web Dev')
      const normalizedCategory = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      query = query.ilike('category', normalizedCategory)
    }

    const { data: courses, error } = await query
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(courses)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}