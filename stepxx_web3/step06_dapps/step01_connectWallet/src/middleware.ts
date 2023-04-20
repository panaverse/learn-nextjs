import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const requestHeaders = new Headers(request.headers)

    const accessToken = request.cookies.get("accessToken")?.value;

    if(request.nextUrl.pathname.startsWith('/api/auth/')){
        return NextResponse.next();
    }

    if (!request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.next();
      }

    if (!accessToken) {
        return new NextResponse(
            JSON.stringify({success: false, message: "auth failed"}),
            {status: 401, headers: {'content-type': 'application/json'}}
        );
    }

    try{
        const verifiedJwt = await (
            await fetch(request.nextUrl.origin + "/api/authorize", {
            method: "post",
            body: JSON.stringify({ accessToken }),
            })
        ).json();
    
        console.log("verifiedJwt ", verifiedJwt)
    
        if(!verifiedJwt){
            return new NextResponse(
                JSON.stringify({success: false, message: "auth failed"}),
                {status: 401, headers: {'content-type': 'application/json'}}
            );
        }
    
        requestHeaders.set('verifiedJwt', JSON.stringify(verifiedJwt))
    
          // You can also set request headers in NextResponse.rewrite
        const response = NextResponse.next({
            request: {
            headers: requestHeaders,
            },
        })

        return response

    }
    catch(err){
        console.log("err ", err)
        const response = new NextResponse(
            JSON.stringify({success: false, message: "auth failed"}),
            {status: 401, headers: {'content-type': 'application/json'}}
        );
        response.cookies.delete("accessToken");
        return response
    }
}
