import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, GraduationCap, DollarSign } from 'lucide-react'

interface OverviewStatsProps {
    totalUsers: number
    totalCourses: number
    totalEnrollments: number
    totalRevenue: number // Mocked for now
}

export function OverviewStats({ totalUsers, totalCourses, totalEnrollments, totalRevenue }: OverviewStatsProps) {
    const stats = [
        {
            title: 'Total Users',
            value: totalUsers.toLocaleString(),
            icon: Users,
            description: '+180 from last month',
        },
        {
            title: 'Active Courses',
            value: totalCourses.toLocaleString(),
            icon: BookOpen,
            description: '+4 new courses',
        },
        {
            title: 'Total Enrollments',
            value: totalEnrollments.toLocaleString(),
            icon: GraduationCap,
            description: '+12% increase',
        },
        {
            title: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            description: '+24% from last month',
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index} className="border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-black text-foreground">
                            {stat.title}
                        </CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">{stat.value}</div>
                        <p className="text-xs font-bold text-muted-foreground">
                            {stat.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
