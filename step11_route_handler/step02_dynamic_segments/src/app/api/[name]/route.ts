import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, {params}) {
    return NextResponse.json({
      From: params.name,
      Message: "Greetings from Pakistan",
      RequestType: "GET"
    });
}

