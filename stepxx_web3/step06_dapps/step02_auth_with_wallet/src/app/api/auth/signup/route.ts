import { dbClient } from "../../client"
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
    const req = await request.json();

    let { publicAddress } : { publicAddress: string }  = req;
    publicAddress = publicAddress.toLowerCase();

    // const userExists = await dbClient
    //           .selectFrom("Users")
    //           .select('publicAddress')
    //           .where('publicAddress', '=', publicAddress)
    //           .executeTakeFirst();

    const userExists = (await dbClient.unsafe(`SELECT "publicAddress" FROM "Users" WHERE "publicAddress" = '${publicAddress}'`))[0];
    if(userExists){
      return NextResponse.json(
        {
          success: false,
          message: 'User Already Exists!',
        },
        {
          status: 401,
        },
      );
    }

    const nonce = Math.floor(Math.random() * 10000).toString();
    const secretText = uuidv4();

    // const user = await dbClient
    //     .insertInto("Users")
    //     .values({ nonce, publicAddress, entity_id: entity[0].entity_id, secretText })
    //     .returning(["nonce", "publicAddress", "entity_id"])
    //     .executeTakeFirstOrThrow();

    const user = (await dbClient.unsafe(`INSERT INTO "Users" (nonce, "publicAddress","secretText") VALUES ('${nonce}', '${publicAddress}', '${secretText}') RETURNING "nonce", "publicAddress"`))[0];

    return NextResponse.json({ user })

}