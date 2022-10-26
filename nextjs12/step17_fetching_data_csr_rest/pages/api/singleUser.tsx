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
    const id = req.query.id;
    const userReq = await axios.get(`https://reqres.in/api/users/${id}`);
    res.status(200).json(userReq.data.data);
}

