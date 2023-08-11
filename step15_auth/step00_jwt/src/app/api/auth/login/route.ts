import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { cookies } from "next/headers";

export const POST = async (request: NextRequest) => {
  const body = await request.json().catch(() => null);

  if (body.email === "admin" && body.password === "admin") {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET
    );

    console.log("secret: ", secret);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({ email: body.email })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    cookies().set("token", jwt, {
      httpOnly: true,
    });

    return NextResponse.json({ message: "Login success" });
  }

  return NextResponse.json({ message: "Invalid Email or password" });
};
