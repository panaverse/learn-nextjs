import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {
  const conn = postgres({
    ssl: require,
  });
  const result = await conn.unsafe("SELECT * FROM playing_with_neon");
  console.log("backend result", result);
  return new NextResponse(JSON.stringify(result));
}
