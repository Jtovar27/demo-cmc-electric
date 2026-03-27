import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/Badge";
import { formatDate, getInitials } from "@/lib/utils";
import { Users } from "lucide-react";

export default async function AdminStudents() {
  const students = await prisma.user.findMany({
    where: { role: "student" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { enrollments: true, progress: true } },
      enrollments: {
        include: { course: { select: { title: true } } },
      },
    },
  });

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-white tracking-tight mb-1">Students</h1>
        <p className="text-[#606060] font-sans text-sm">{students.length} registered students</p>
      </div>

      {students.length === 0 ? (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-12 text-center">
          <Users className="h-12 w-12 text-[#2A2A2A] mx-auto mb-4" />
          <p className="text-[#606060] font-mono">No students yet</p>
        </div>
      ) : (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1A1A1A]">
                {["Student", "Email", "Courses", "Progress", "Joined", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-[10px] font-mono tracking-widest uppercase text-[#606060]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-[#141414] table-row-hover">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-mono font-bold text-[#FFD700]">
                          {getInitials(student.name || student.email)}
                        </span>
                      </div>
                      <span className="text-sm font-mono text-white">
                        {student.name || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-[#A0A0A0]">{student.email}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-mono text-white">
                        {student._count.enrollments} enrolled
                      </span>
                      {student.enrollments.slice(0, 2).map((e) => (
                        <span key={e.id} className="text-[10px] font-mono text-[#606060] line-clamp-1">
                          {e.course.title}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-[#A0A0A0]">
                      {student._count.progress} lessons done
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-[#606060]">
                      {formatDate(student.createdAt)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant="success" size="sm">active</Badge>
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
