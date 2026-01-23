import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-secondary/20">
            <AdminSidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="mx-auto max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
