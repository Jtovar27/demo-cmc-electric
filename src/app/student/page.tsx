import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateProgress } from "@/lib/utils";
import { BookOpen, CheckCircle, Clock, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default async function StudentDashboard() {
  const session = await auth();
  if (!session) return null;

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id, status: "active" },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: { where: { visible: true } },
            },
          },
        },
      },
    },
  });

  const progressData = await prisma.progress.findMany({
    where: { userId: session.user.id, completed: true },
  });

  const completedLessonIds = new Set(progressData.map((p) => p.lessonId));

  const enrollmentsWithProgress = enrollments.map((e) => {
    const allLessons = e.course.modules.flatMap((m) => m.lessons);
    const completed = allLessons.filter((l) => completedLessonIds.has(l.id)).length;
    const total = allLessons.length;
    const percent = calculateProgress(completed, total);
    const nextLesson = allLessons.find((l) => !completedLessonIds.has(l.id));
    return { ...e, completed, total, percent, nextLesson };
  });

  const totalCompleted = progressData.length;
  const firstName = session.user.name?.split(" ")[0] || "Student";

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8">
      {/* Welcome header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-2 w-2 bg-[#22C55E] rounded-full animate-pulse" />
          <span className="text-xs font-mono tracking-widest uppercase text-[#606060]">
            Active Session
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
          Welcome back,{" "}
          <span className="text-gradient">{firstName}</span>
        </h1>
        <p className="text-[#606060] font-sans mt-2">
          Continue your electrical training journey.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Enrolled Courses", value: enrollments.length, icon: BookOpen },
          { label: "Lessons Completed", value: totalCompleted, icon: CheckCircle },
          { label: "In Progress", value: enrollments.filter(e => enrollmentsWithProgress.find(ep => ep.id === e.id)?.percent! < 100 && enrollmentsWithProgress.find(ep => ep.id === e.id)?.percent! > 0).length, icon: Clock },
          { label: "Completed Courses", value: enrollmentsWithProgress.filter(e => e.percent === 100).length, icon: Zap },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0F0F0F] border border-[#1A1A1A] p-5">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className="h-4 w-4 text-[#FFD700]" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#606060]">
                {stat.label}
              </span>
            </div>
            <div className="text-3xl font-mono font-bold text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* My Courses */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-mono font-bold text-white tracking-wide">
            My Courses
          </h2>
          <Link href="/student/cursos">
            <Button variant="ghost" size="sm" iconRight={<ArrowRight className="h-3.5 w-3.5" />}>
              View All
            </Button>
          </Link>
        </div>

        {enrollmentsWithProgress.length === 0 ? (
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
          <div className="grid md:grid-cols-2 gap-5">
            {enrollmentsWithProgress.map((enrollment) => {
              const course = enrollment.course;

              return (
                <div
                  key={enrollment.id}
                  className="bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/20 transition-all duration-300 group overflow-hidden"
                >
                  {/* Course cover */}
                  <div className="relative h-40 overflow-hidden bg-[#141414]">
                    {course.coverImage ? (
                      <Image
                        src={course.coverImage}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />

                    {/* Progress overlay */}
                    <div className="absolute bottom-0 left-0 right-0">
                      <div className="h-1 bg-[#1A1A1A]">
                        <div
                          className="h-full progress-bar transition-all duration-500"
                          style={{ width: `${enrollment.percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 bg-[#080808]/80 backdrop-blur-sm px-2 py-1">
                      <span className="text-xs font-mono text-[#FFD700] font-bold">
                        {enrollment.percent}%
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    <div>
                      <h3 className="text-sm font-mono font-bold text-white tracking-wide leading-snug group-hover:text-[#FFD700] transition-colors mb-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[#606060] font-mono">
                        {enrollment.completed} / {enrollment.total} lessons completed
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {enrollment.nextLesson ? (
                        <Link
                          href={`/student/cursos/${course.slug}`}
                          className="flex-1"
                        >
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-full"
                            iconRight={<ArrowRight className="h-3.5 w-3.5" />}
                          >
                            Continue
                          </Button>
                        </Link>
                      ) : (
                        <div className="flex items-center gap-2 text-green-400 text-xs font-mono">
                          <CheckCircle className="h-4 w-4" />
                          Course Completed
                        </div>
                      )}
                      <Link href={`/student/cursos/${course.slug}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
