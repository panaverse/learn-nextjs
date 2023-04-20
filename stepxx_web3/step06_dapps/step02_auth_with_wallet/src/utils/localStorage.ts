import { decode } from "jsonwebtoken";

export interface UserData {
    publicAddress: string;
    first_name: string;
    last_name: string;
    entity_id: number;
    email: string;
    pictureUrl: string;
    creation_date: string;
}

export class CurrentToken {
    static storageKey: string = 'CURRENT_TOKEN';
  
    get = (): { token?: string; } => {
        if (typeof window !== 'undefined') {
            const jsonSting = localStorage.getItem(CurrentToken.storageKey);
            if (jsonSting) {
                return JSON.parse(jsonSting);
            }
        }
      return {};
    };
  
    set = ({ token }: { token: string;}) => {
        if (typeof window !== 'undefined') {
        localStorage.setItem(CurrentToken.storageKey, JSON.stringify({ token }));
        }
    };
  
    remove = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(CurrentToken.storageKey);
        }
    };
}

export const getUserClient = () => {
    const {token} = new CurrentToken().get();
    const accessToken = token;
    if(accessToken){
        const decodedToken: any = decode(accessToken);
        const payload : UserData = decodedToken.payload;
        return payload;
    }
    return;
}