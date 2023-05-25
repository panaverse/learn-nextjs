import { dbClient } from "../../client";
import { NextResponse } from "next/server";
import { decode, verify } from "jsonwebtoken";
import { errorCodes } from "../../errorCodes";

export async function POST(request: Request) {
  const req = await request.json();

  console.log("req ", req)

  let { accessToken }: { accessToken: string } = req;

  const decodedToken: any = decode(accessToken);
  console.log("decodedToken ", decodedToken)

  if (!decodedToken) {
      return new Response("Decoded Token", {
          status: 401,
      });
  }

  const userSecretText = (
      await dbClient.unsafe(
          `SELECT "secretText" FROM "Users" WHERE "publicAddress" = '${decodedToken.payload.publicAddress}'`,
      )
  )[0];

  if (!userSecretText.secretText) {
      return new Response("User with this public Address not found!", {
          status: 401,
      });
  }

  var verifiedJwt: any = verify(accessToken, userSecretText.secretText);

  return NextResponse.json({ verifiedJwt });
}
