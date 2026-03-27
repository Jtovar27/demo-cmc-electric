import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { lessonId } = await req.json();

  if (!lessonId) return NextResponse.json({ error: "lessonId required" }, { status: 400 });

  const progress = await prisma.progress.upsert({
    where: {
      userId_lessonId: { userId: session.user.id, lessonId },
    },
    create: {
      userId: session.user.id,
      lessonId,
      completed: true,
    },
    update: {
      completed: true,
    },
  });

  return NextResponse.json({ success: true, progress });
}
