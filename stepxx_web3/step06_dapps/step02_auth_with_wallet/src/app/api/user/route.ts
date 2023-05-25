import { dbClient } from "../client"
import { NextFetchEvent, NextResponse } from 'next/server';

export async function GET(request: Request, event: NextFetchEvent) {

  const requestHeaders = new Headers(request.headers)
  console.log("requestHeaders.get ", requestHeaders.get("verifiedJwt"))

    const entity = await dbClient.unsafe(`SELECT * from "Users"`)
    
  return NextResponse.json(entity)

}
