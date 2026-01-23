import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function checkAdmin() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // MVP: Check against a hardcoded list of admin emails or a specific metadata field
    // For production, this should check a 'role' column in the database.
    const adminEmails = ['admin@eduflow.com', 'bhoumik@example.com'] // Example

    // Also check if there's a custom claim or DB role (pseudo-code fallbacks)
    // const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
    // if (profile?.role !== 'admin' && !adminEmails.includes(user.email!)) { ... }

    // For this MVP, we will allow access if authenticated, but in a real app:
    // if (!adminEmails.includes(user.email || '')) {
    //   redirect('/') 
    // }

    return user
}
