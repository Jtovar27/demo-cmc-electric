import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getInitials, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { User, Mail, Calendar, BookOpen, CheckCircle } from "lucide-react";

export default async function StudentProfile() {
  const session = await auth();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      enrollments: { include: { course: { select: { title: true } } } },
      _count: { select: { progress: true, enrollments: true } },
    },
  });

  if (!user) return null;

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-white tracking-tight mb-1">Profile</h1>
        <p className="text-[#606060] font-sans text-sm">Your account information</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Avatar + name */}
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 flex items-center gap-5">
          <div className="h-16 w-16 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-mono font-bold text-[#FFD700]">
              {getInitials(user.name || user.email)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-mono font-bold text-white">{user.name || "Student"}</h2>
            <Badge variant="yellow" size="sm" className="mt-1">Student</Badge>
          </div>
        </div>

        {/* Details */}
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 flex flex-col gap-4">
          <h3 className="text-xs font-mono tracking-widest uppercase text-[#FFD700]">Account Details</h3>
          {[
            { icon: User, label: "Full Name", value: user.name || "Not set" },
            { icon: Mail, label: "Email", value: user.email },
            { icon: Calendar, label: "Member Since", value: formatDate(user.createdAt) },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-9 w-9 bg-white/5 border border-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                <item.icon className="h-4 w-4 text-[#FFD700]" />
              </div>
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#606060]">{item.label}</p>
                <p className="text-sm font-mono text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-5 flex flex-col gap-2">
            <BookOpen className="h-5 w-5 text-[#FFD700]" />
            <div className="text-2xl font-mono font-bold text-white">{user._count.enrollments}</div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#606060]">Courses Enrolled</div>
          </div>
          <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-5 flex flex-col gap-2">
            <CheckCircle className="h-5 w-5 text-[#FFD700]" />
            <div className="text-2xl font-mono font-bold text-white">{user._count.progress}</div>
            <div className="text-xs font-mono tracking-widest uppercase text-[#606060]">Lessons Completed</div>
          </div>
        </div>

        {/* Enrolled courses */}
        {user.enrollments.length > 0 && (
          <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-6 flex flex-col gap-3">
            <h3 className="text-xs font-mono tracking-widest uppercase text-[#FFD700]">Enrolled Courses</h3>
            {user.enrollments.map((e) => (
              <div key={e.id} className="flex items-center gap-3 py-2 border-b border-[#141414] last:border-0">
                <BookOpen className="h-4 w-4 text-[#606060] flex-shrink-0" />
                <span className="text-sm font-mono text-[#A0A0A0]">{e.course.title}</span>
                <Badge variant="success" size="sm" className="ml-auto">{e.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
