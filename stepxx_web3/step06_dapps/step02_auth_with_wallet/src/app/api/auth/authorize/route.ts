import { dbClient } from "../../client"
import { NextResponse } from 'next/server';
import { decode, verify } from "jsonwebtoken";

export async function POST(request: Request) {
    const req = await request.json();

    let { accessToken } : { accessToken: string }  = req;

    const decodedToken: any = decode(accessToken)

    if(!decodedToken){
        throw new Error("Decoded Token")
    }

    const userSecretText = (await dbClient.unsafe(`SELECT "secretText" FROM "Users" WHERE "publicAddress" = '${decodedToken.payload.publicAddress}'`))[0];

    if(!userSecretText.secretText){
      return NextResponse.json(
        {
          status: 401,
          message: 'User with this public Address not found!',
        },
      );
    }

    var verifiedJwt: any = verify(accessToken, userSecretText.secretText);

    return NextResponse.json({verifiedJwt})

}