import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import {
  Users,
  BookOpen,
  FileText,
  TrendingUp,
  ArrowRight,
  Plus,
  CheckCircle,
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) return null;

  const [totalStudents, totalCourses, totalPosts, recentEnrollments, publishedCourses] = await Promise.all([
    prisma.user.count({ where: { role: "student" } }),
    prisma.course.count(),
    prisma.blogPost.count(),
    prisma.enrollment.findMany({
      take: 5,
      orderBy: { enrolledAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    }),
    prisma.course.count({ where: { status: "published" } }),
  ]);

  const activeEnrollments = await prisma.enrollment.count({ where: { status: "active" } });

  const stats = [
    { label: "Total Students", value: totalStudents, icon: Users, href: "/admin/estudiantes", color: "text-blue-400" },
    { label: "Total Courses", value: totalCourses, icon: BookOpen, href: "/admin/cursos", color: "text-[#FFD700]" },
    { label: "Active Enrollments", value: activeEnrollments, icon: TrendingUp, href: "/admin/estudiantes", color: "text-green-400" },
    { label: "Published Courses", value: publishedCourses, icon: CheckCircle, href: "/admin/cursos", color: "text-purple-400" },
  ];

  const quickActions = [
    { label: "Add Course", href: "/admin/cursos/nuevo", icon: Plus },
    { label: "Add Blog Post", href: "/admin/blog/nuevo", icon: Plus },
    { label: "View Students", href: "/admin/estudiantes", icon: Users },
    { label: "Manage FAQ", href: "/admin/faq", icon: FileText },
  ];

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-[#606060]">
            Admin Session
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
          Admin <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-[#606060] font-sans mt-2">
          Manage your platform, courses, and students.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <Link key={i} href={stat.href}>
            <div className="bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/20 p-5 transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-white/5 flex items-center justify-center">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-[#2A2A2A] group-hover:text-[#FFD700] transition-colors" />
              </div>
              <div className="text-3xl font-mono font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs font-mono tracking-widest uppercase text-[#606060]">
                {stat.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Enrollments */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-mono font-bold text-white">Recent Enrollments</h2>
            <Link href="/admin/estudiantes">
              <Button variant="ghost" size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
                View All
              </Button>
            </Link>
          </div>

          <div className="bg-[#0F0F0F] border border-[#1A1A1A] overflow-hidden">
            {recentEnrollments.length === 0 ? (
              <div className="p-8 text-center text-[#606060] font-mono text-sm">
                No enrollments yet
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1A1A1A]">
                    {["Student", "Course", "Date", "Status"].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-[10px] font-mono tracking-widest uppercase text-[#606060]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentEnrollments.map((e) => (
                    <tr key={e.id} className="border-b border-[#141414] table-row-hover">
                      <td className="px-5 py-3.5">
                        <div>
                          <p className="text-xs font-mono text-white">{e.user.name || "—"}</p>
                          <p className="text-[10px] font-mono text-[#606060]">{e.user.email}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-mono text-[#A0A0A0] line-clamp-1">{e.course.title}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <p className="text-xs font-mono text-[#606060]">
                          {formatDate(e.enrolledAt)}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge variant="success" size="sm">{e.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-mono font-bold text-white mb-5">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {quickActions.map((action, i) => (
              <Link key={i} href={action.href}>
                <div className="flex items-center gap-3 p-4 bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/20 transition-all duration-300 group cursor-pointer">
                  <div className="h-9 w-9 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFD700]/20 transition-all">
                    <action.icon className="h-4 w-4 text-[#FFD700]" />
                  </div>
                  <span className="text-sm font-mono text-white group-hover:text-[#FFD700] transition-colors">
                    {action.label}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#2A2A2A] group-hover:text-[#FFD700] ml-auto transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
