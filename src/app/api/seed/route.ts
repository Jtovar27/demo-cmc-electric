import { NextResponse } from "next/server";
import { seedDatabase } from "@/data/seed";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (process.env.NODE_ENV === "production" && secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    await seedDatabase();
    return NextResponse.json({ success: true, message: "Database seeded" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
