import { dbClient } from "../../client";
import { NextResponse } from "next/server";
import { bufferToHex } from "ethereumjs-util";
import { sign as jwtSign } from "jsonwebtoken";
import { recoverPersonalSignature } from "eth-sig-util";
import { errorCodes } from "../../errorCodes";
import { v4 as uuidv4 } from "uuid";
import { ethers } from "ethers";
import { verifyMessage } from "@ambire/signature-validator";

import type { NextRequest } from 'next/server'

interface Req {
  publicAddress: string;
  signature: string;
}

export async function POST(request: Request) {
    const req = await request.json();

    let { publicAddress, signature }: Req = req;
    publicAddress = publicAddress.toLowerCase();

    const user = (await dbClient.unsafe(`SELECT "Users".* from "Users" WHERE "publicAddress"='${publicAddress}'`))[0];

    if (!user) {
        return new Response('User Not Already Exists! Please SignIn',
            {
              status: errorCodes.notFound,
            },
        );
    }

    const message = `My App Auth Service Signing nonce: ${user.nonce}`;
    const provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com')

    const isValidSig = await verifyMessage({
        signer: publicAddress,
        message,
        signature: signature,
        provider,
    })

    if (!isValidSig) {
        return new Response('Signnature is incorrect',
            {
              status: errorCodes.notFound,
            },
        );
    }

    const secretText = uuidv4();
    await dbClient.unsafe(`UPDATE "Users" set nonce = '${Math.floor(Math.random() * 10000).toString()}', "secretText" = '${secretText}' WHERE "publicAddress" = '${publicAddress}'`);

    let payload = {
        publicAddress: publicAddress
    };

    const accessToken = jwtSign(
        {
        payload: payload,
        },
        secretText,
        {
        expiresIn: "24h", // expires in 24 hours
        }
    );

    const response =  NextResponse.json({ data: accessToken })
    response.cookies.set({
		name: 'accessToken',
		value: accessToken
	})

    return response;
}
