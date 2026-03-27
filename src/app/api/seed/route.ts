import { NextResponse } from "next/server";
import { seedDatabase } from "@/data/seed";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
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
