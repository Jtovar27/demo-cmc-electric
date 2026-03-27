import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateProgress } from "@/lib/utils";
import { BookOpen, CheckCircle, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default async function StudentCourses() {
  const session = await auth();
  if (!session) return null;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id, status: "active" },
    include: {
      course: {
        include: {
          modules: {
            include: {
              _count: { select: { lessons: true } },
              lessons: { where: { visible: true } },
            },
          },
        },
      },
    },
    orderBy: { enrolledAt: "desc" },
  });

  const progressData = await prisma.progress.findMany({
    where: { userId: session.user.id, completed: true },
  });

  const completedIds = new Set(progressData.map((p) => p.lessonId));

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8">
      <div className="mb-8">
        <h1 className="text-3xl font-mono font-bold text-white tracking-tight mb-2">My Courses</h1>
        <p className="text-[#606060] font-sans">
          {enrollments.length} course{enrollments.length !== 1 ? "s" : ""} enrolled
        </p>
      </div>

      {enrollments.length === 0 ? (
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-12 text-center flex flex-col items-center gap-4">
          <div className="h-14 w-14 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
            <BookOpen className="h-7 w-7 text-[#FFD700]" />
          </div>
          <h3 className="text-lg font-mono font-bold text-white">No courses yet</h3>
          <p className="text-sm text-[#606060] font-sans max-w-sm">
            Contact us to get enrolled in one of our professional electrical training programs.
          </p>
          <Link href="/es/programas">
            <Button variant="primary" size="md">Browse Programs</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {enrollments.map((enrollment) => {
            const course = enrollment.course;
            const allLessons = course.modules.flatMap((m) => m.lessons);
            const completed = allLessons.filter((l) => completedIds.has(l.id)).length;
            const total = allLessons.length;
            const percent = calculateProgress(completed, total);

            return (
              <div
                key={enrollment.id}
                className="bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/20 transition-all duration-300 group overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-56 h-48 md:h-auto overflow-hidden bg-[#141414] flex-shrink-0">
                    {course.coverImage ? (
                      <Image
                        src={course.coverImage}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F0F0F]/80" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-5 p-6 flex-1">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant={course.level === "advanced" ? "yellow" : course.level === "intermediate" ? "warning" : "muted"} size="sm">
                          {course.level}
                        </Badge>
                        {percent === 100 && (
                          <Badge variant="success" size="sm">
                            <CheckCircle className="h-2.5 w-2.5 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-lg font-mono font-bold text-white tracking-wide group-hover:text-[#FFD700] transition-colors">
                        {course.title}
                      </h2>
                      <p className="text-sm text-[#606060] font-sans mt-1 line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-[#606060]">
                          {completed} / {total} lessons
                        </span>
                        <span className="text-xs font-mono font-bold text-[#FFD700]">
                          {percent}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#1A1A1A]">
                        <div
                          className="h-full progress-bar transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 text-xs font-mono text-[#606060]">
                      <span className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-[#FFD700]" />
                        {course.modules.length} modules
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-[#FFD700]" />
                        {total} lessons
                      </span>
                    </div>

                    <div>
                      <Link href={`/student/cursos/${course.slug}`}>
                        <Button
                          variant="primary"
                          size="sm"
                          iconRight={<ArrowRight className="h-3.5 w-3.5" />}
                        >
                          {percent === 0 ? "Start Course" : percent === 100 ? "Review Course" : "Continue"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
