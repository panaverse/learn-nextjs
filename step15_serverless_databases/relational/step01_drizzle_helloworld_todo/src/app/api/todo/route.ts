import { NextRequest, NextResponse } from "next/server";
import { db, todoTable } from "@/lib/drizzle";
export async function POST(request: NextRequest) {
  const body = await request.json();
  const data = await db.insert(todoTable).values(body).returning();

  return new NextResponse(
    JSON.stringify({
      message: "Data Added",
      data,
    })
  );
}
