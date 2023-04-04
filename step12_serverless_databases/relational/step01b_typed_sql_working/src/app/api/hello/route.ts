import { NextRequest, NextResponse } from "next/server";

import {
  Kysely,
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
} from 'kysely';

import { NeonDialect } from "kysely-neon";

interface playing_with_neon_Table {
  id: Generated<number>
  name: string
  value: number
}

interface Database {
  playing_with_neon: playing_with_neon_Table
}


export async function GET(request: NextRequest) {
  const db = new Kysely<Database>({
    dialect: new NeonDialect({
      connectionString: process.env.NEON_DATABASE_URL!,
    }),
  });
  
  const result = await db
  .selectFrom("playing_with_neon")
  .selectAll()
  .execute()
  
  console.log("backend result", result);
  return new NextResponse(JSON.stringify(result));
}



