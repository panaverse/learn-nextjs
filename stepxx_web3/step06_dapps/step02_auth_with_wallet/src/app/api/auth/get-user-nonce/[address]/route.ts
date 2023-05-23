import { errorCodes } from "@/app/api/errorCodes";
import { dbClient } from "../../../client";
import { NextResponse } from "next/server";

interface ParamsType {
  address: string;
}

export async function GET(
  request: Request,
  { params }: { params: ParamsType }
) {
  let address = params.address;
  address = address.toLowerCase();

  const userExists = (
    await dbClient.unsafe(
      `SELECT "publicAddress", "nonce" FROM "Users" WHERE "publicAddress" = '${address}'`
    )
  )[0];

  if (!userExists) {
    return new Response("User with this public Address not found!", {
      status: errorCodes.notFound,
    });
  }

  return NextResponse.json(userExists);
}
