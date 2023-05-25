import { dbClient } from "../../client"
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";
import { errorCodes } from "../../errorCodes";

export async function POST(request: Request) {
    const req = await request.json();

    let { publicAddress } : { publicAddress: string }  = req;
    publicAddress = publicAddress.toLowerCase();
    
    const userExists = (await dbClient.unsafe(`SELECT "publicAddress" FROM "Users" WHERE "publicAddress" = '${publicAddress}'`))[0];
    if(userExists){
      return new Response('User Already Exists!',
            {
              status: errorCodes.notFound,
            },
        );
    }

    const nonce = Math.floor(Math.random() * 10000).toString();
    const secretText = uuidv4();
    const user = (await dbClient.unsafe(`INSERT INTO "Users" (nonce, "publicAddress","secretText") VALUES ('${nonce}', '${publicAddress}', '${secretText}') RETURNING "nonce", "publicAddress"`))[0];

    return NextResponse.json({ user })

}