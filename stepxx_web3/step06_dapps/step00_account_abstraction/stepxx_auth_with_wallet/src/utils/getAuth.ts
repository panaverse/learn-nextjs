import { cookies } from "next/headers";
import { decode } from 'jsonwebtoken';

export interface UserData {
    publicAddress: string;
    first_name: string;
    last_name: string;
    entity_id: number;
    email: string;
    pictureUrl: string;
    creation_date: string;
    entity_type: string;
}

export const getUser = () => {
    const accessToken = cookies().get("accessToken")?.value;
    if(accessToken){
        const decodedToken: any = decode(accessToken);
        const payload : UserData = decodedToken.payload;
        return payload;
    }
    return;
}