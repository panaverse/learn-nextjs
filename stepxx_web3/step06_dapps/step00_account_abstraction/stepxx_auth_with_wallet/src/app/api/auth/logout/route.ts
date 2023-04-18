import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const response =  NextResponse.json({ data: "true" })
    response.cookies.delete("accessToken");
    return response
}
