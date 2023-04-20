import { dbClient } from "../../../client"
import { NextResponse } from 'next/server';

interface ParamsType {
  address: string;
}

export async function GET(request: Request, { params }: {params: ParamsType}) {
    let address = params.address;
    address = address.toLowerCase();

    // const user = await dbClient
    //           .selectFrom("Users")
    //           .innerJoin('Entity', 'Entity.entity_id', 'Users.entity_id')
    //           .select(["nonce", "publicAddress", "Users.entity_id"])
    //           .where('Users.publicAddress', '=', address)
    //           .executeTakeFirst();

    const userExists = (await dbClient.unsafe(`SELECT "publicAddress", "nonce" FROM "Users" WHERE "publicAddress" = '${address}'`))[0];

    if(!userExists){
      return NextResponse.json(
        {
          status: 401,
          message: 'User with this public Address not found!',
        },
      );
    }

  return NextResponse.json(userExists)

}