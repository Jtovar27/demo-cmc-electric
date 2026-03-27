import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { lessonId } = await params;
  const courseSlug = req.nextUrl.searchParams.get("courseSlug");

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      resources: true,
      module: {
        include: {
          course: true,
          lessons: {
            where: { visible: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!lesson) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Check enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: lesson.module.courseId,
      },
    },
  });

  if (!enrollment) return NextResponse.json({ error: "Not enrolled" }, { status: 403 });

  // Get all lessons in course to find prev/next
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug || "" },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { visible: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  const allLessons = course?.modules.flatMap((m) => m.lessons) || [];
  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Get progress
  const progress = await prisma.progress.findUnique({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
  });

  return NextResponse.json({
    lesson,
    prevLesson,
    nextLesson,
    isCompleted: progress?.completed || false,
    courseSlug: course?.slug || courseSlug,
  });
}
