import Link from "next/link";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { Plus, Edit, BookOpen, Layers } from "lucide-react";

export default async function AdminCourses() {
  const courses = await prisma.course.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
    include: {
      _count: { select: { modules: true, enrollments: true } },
    },
  });

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-mono font-bold text-white tracking-tight mb-1">Courses</h1>
          <p className="text-[#606060] font-sans text-sm">{courses.length} total courses</p>
        </div>
        <Link href="/admin/cursos/nuevo">
          <Button variant="primary" size="md" icon={<Plus className="h-4 w-4" />}>
            Add Course
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-12 text-center">
          <BookOpen className="h-12 w-12 text-[#2A2A2A] mx-auto mb-4" />
          <p className="text-[#606060] font-mono mb-4">No courses yet</p>
          <Link href="/admin/cursos/nuevo">
            <Button variant="primary" size="md">Add First Course</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1A1A1A]">
                {["Course", "Level", "Price", "Modules", "Enrollments", "Status", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-[10px] font-mono tracking-widest uppercase text-[#606060]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-[#141414] table-row-hover">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-mono font-bold text-white">{course.title}</p>
                      <p className="text-[10px] font-mono text-[#606060]">{course.slug}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant={course.level === "advanced" ? "yellow" : course.level === "intermediate" ? "warning" : "muted"}
                      size="sm"
                    >
                      {course.level}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-mono text-[#FFD700]">
                      {course.price === 0 ? "Free" : formatPrice(course.price)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-xs font-mono text-[#A0A0A0]">
                      <Layers className="h-3 w-3" />
                      {course._count.modules}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-[#A0A0A0]">
                      {course._count.enrollments}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant={course.status === "published" ? "success" : "muted"}
                      size="sm"
                    >
                      {course.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/cursos/${course.id}`}>
                      <Button variant="outline" size="sm" icon={<Edit className="h-3.5 w-3.5" />}>
                        Edit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
