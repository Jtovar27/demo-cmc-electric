import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calculateProgress } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Play,
  Lock,
  Clock,
  Layers,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const session = await auth();
  if (!session) return null;

  // Check enrollment
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { visible: true },
            orderBy: { order: "asc" },
            include: {
              resources: true,
            },
          },
        },
      },
    },
  });

  if (!course) notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId: session.user.id, courseId: course.id },
    },
  });

  if (!enrollment) notFound();

  const progressData = await prisma.progress.findMany({
    where: { userId: session.user.id },
  });

  const progressMap = new Map(progressData.map((p) => [p.lessonId, p.completed]));

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const completedCount = allLessons.filter((l) => progressMap.get(l.id)).length;
  const percent = calculateProgress(completedCount, allLessons.length);

  // Find first incomplete lesson
  const nextLesson = allLessons.find((l) => !progressMap.get(l.id));

  return (
    <div className="p-6 md:p-8 pt-20 lg:pt-8">
      {/* Back */}
      <Link
        href="/student/cursos"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#606060] hover:text-[#FFD700] transition-colors mb-6"
      >
        <ArrowLeft className="h-3 w-3" />
        My Courses
      </Link>

      {/* Course header */}
      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={course.level === "advanced" ? "yellow" : course.level === "intermediate" ? "warning" : "muted"} size="sm">
              {course.level}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight mb-3">
            {course.title}
          </h1>
          <p className="text-[#A0A0A0] font-sans leading-relaxed">{course.description}</p>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-[#606060]">
                {completedCount} / {allLessons.length} lessons completed
              </span>
              <span className="text-sm font-mono font-bold text-[#FFD700]">{percent}%</span>
            </div>
            <div className="h-2 bg-[#1A1A1A]">
              <div
                className="h-full progress-bar transition-all duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Side card */}
        <div className="bg-[#0F0F0F] border border-[#1A1A1A] p-5 flex flex-col gap-4 self-start">
          {course.coverImage && (
            <div className="relative aspect-video overflow-hidden">
              <Image src={course.coverImage} alt={course.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="h-12 w-12 bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center">
                  <Play className="h-6 w-6 text-[#FFD700] fill-current ml-0.5" />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#606060]">Modules</span>
              <span className="text-white">{course.modules.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#606060]">Lessons</span>
              <span className="text-white">{allLessons.length}</span>
            </div>
            {course.duration && (
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#606060]">Duration</span>
                <span className="text-white">{course.duration}</span>
              </div>
            )}
          </div>

          {nextLesson && (
            <Link href={`/student/cursos/${courseSlug}/leccion/${nextLesson.id}`}>
              <Button variant="primary" size="md" className="w-full" icon={<Play className="h-4 w-4" />}>
                {completedCount === 0 ? "Start Learning" : "Continue"}
              </Button>
            </Link>
          )}

          {percent === 100 && (
            <div className="flex items-center gap-2 text-green-400 text-sm font-mono justify-center py-2">
              <CheckCircle className="h-5 w-5" />
              Course Completed!
            </div>
          )}
        </div>
      </div>

      {/* Curriculum */}
      <div>
        <h2 className="text-xl font-mono font-bold text-white tracking-wide mb-6">
          Course Content
        </h2>

        <div className="flex flex-col gap-4">
          {course.modules.map((module, mi) => {
            const moduleCompleted = module.lessons.filter((l) => progressMap.get(l.id)).length;
            const modulePercent = calculateProgress(moduleCompleted, module.lessons.length);

            return (
              <div key={module.id} className="bg-[#0F0F0F] border border-[#1A1A1A] overflow-hidden">
                {/* Module header */}
                <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#141414] border-b border-[#1A1A1A]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20 px-2 py-0.5 flex-shrink-0">
                      {String(mi + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-mono font-bold text-white">{module.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono text-[#606060]">
                      {moduleCompleted}/{module.lessons.length}
                    </span>
                    {modulePercent === 100 && (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    )}
                  </div>
                </div>

                {/* Lessons */}
                <div>
                  {module.lessons.map((lesson, li) => {
                    const isCompleted = progressMap.get(lesson.id) === true;
                    const isFirst = li === 0;

                    return (
                      <Link
                        key={lesson.id}
                        href={`/student/cursos/${courseSlug}/leccion/${lesson.id}`}
                        className={cn(
                          "flex items-center gap-4 px-5 py-3.5 border-b border-[#141414] last:border-0 transition-all duration-200",
                          isCompleted
                            ? "hover:bg-green-500/5"
                            : "hover:bg-[#FFD700]/5"
                        )}
                      >
                        <div
                          className={cn(
                            "h-7 w-7 flex items-center justify-center flex-shrink-0 border",
                            isCompleted
                              ? "bg-green-500/10 border-green-500/20 text-green-400"
                              : "bg-[#1A1A1A] border-[#2A2A2A] text-[#606060]"
                          )}
                        >
                          {isCompleted ? (
                            <CheckCircle className="h-3.5 w-3.5" />
                          ) : lesson.videoUrl ? (
                            <Play className="h-3.5 w-3.5 ml-0.5" />
                          ) : (
                            <BookOpen className="h-3.5 w-3.5" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "text-sm font-mono",
                            isCompleted ? "text-[#606060] line-through" : "text-white"
                          )}>
                            {lesson.title}
                          </p>
                          {lesson.resources.length > 0 && (
                            <p className="text-[10px] font-mono text-[#404040] mt-0.5">
                              {lesson.resources.length} resource{lesson.resources.length !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>

                        {lesson.duration && (
                          <span className="text-xs font-mono text-[#404040] flex-shrink-0 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
