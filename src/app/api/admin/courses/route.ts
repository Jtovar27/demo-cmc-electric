import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, titleEs, slug, description, descriptionEs, price, level, duration, status, featured } = body;

  if (!title || !titleEs || !slug || !description || !descriptionEs) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const course = await prisma.course.create({
    data: {
      title,
      titleEs,
      slug,
      description,
      descriptionEs,
      price: price ?? 0,
      level: level ?? "beginner",
      duration: duration ?? null,
      status: status ?? "draft",
      featured: featured ?? false,
    },
  });

  return NextResponse.json({ success: true, course }, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ courses });
}
