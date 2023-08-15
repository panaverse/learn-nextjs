import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const GET = async (request: NextRequest) => {
  const user = JSON.parse(request.headers.get("user") as string);

  return NextResponse.json(user);
};
