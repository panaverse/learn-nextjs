import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type User = {
    username: string;
    profile_picture: string;
    first_name: string;
    last_name: string;
    email: string;
    company: string;
    job_title: string;

}

//https://nextjs.org/docs/api-routes/introduction
//https://nextjs.org/docs/basic-features/typescript#api-routes
export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
    const username: string = req.query.username;
    const API_ENDPOINT: string = process.env.API_ENDPOINT;
    const API_TOKEN: string = process.env.API_TOKEN;
    const userReq = await axios.get(`${API_ENDPOINT}/04/users/${username}`,
        { headers: { authorization: API_TOKEN } }
    );
    res
    .status(200)
    .json(userReq.data);
}

