import { dbClient } from "../client"
import { NextFetchEvent, NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();

  const entity = await dbClient.unsafe(`INSERT INTO "Entity" (entity_type, name) VALUES ('user', 'uzair') RETURNING "Entity".entity_id`);

  console.log("entity ", entity[0]);

  return NextResponse.json({ entity: entity[0] })

}

export async function GET(request: Request, event: NextFetchEvent) {

  const requestHeaders = new Headers(request.headers)
  console.log("requestHeaders.get ", requestHeaders.get("verifiedJwt"))

    const entity = await dbClient.unsafe(`SELECT * from "Entity"`)
    
  return NextResponse.json(entity)

}
