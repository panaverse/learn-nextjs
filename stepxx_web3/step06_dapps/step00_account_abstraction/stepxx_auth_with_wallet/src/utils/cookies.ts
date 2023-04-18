import { cookies } from "next/headers";

export const getAccessToken = () => cookies().get("accessToken")?.value;

// export class COOKIES {
//     static storageKey: string = 'CURRENT_TOKEN';
  
//     get = (): { token?: string; } => {
//         if (typeof window !== 'undefined') {
//             const jsonSting = localStorage.getItem(CurrentToken.storageKey);
//             if (jsonSting) {
//                 return JSON.parse(jsonSting);
//             }
//         }
//       return {};
//     };
  
//     set = ({ token }: { token: string;}) => {
//         if (typeof window !== 'undefined') {
//         localStorage.setItem(CurrentToken.storageKey, JSON.stringify({ token }));
//         }
//     };
  
//     remove = () => {
//         if (typeof window !== 'undefined') {
//             localStorage.removeItem(CurrentToken.storageKey);
//         }
//     };
// }