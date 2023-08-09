import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let jwt = request.cookies.get("token")?.value;

  console.log("token: ", jwt);

  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  );

  if (!jwt) {
    return NextResponse.redirect("/login");
  } else {
    const { payload, protectedHeader } = await jose.jwtVerify(jwt, secret);
    const headers = new Headers(request.headers);
    headers.set("user", JSON.stringify(payload.email));

    console.log(protectedHeader);
    console.log(payload);
    return NextResponse.next({
      request: {
        headers: headers,
      },
    });
  }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/api*"],
// };
