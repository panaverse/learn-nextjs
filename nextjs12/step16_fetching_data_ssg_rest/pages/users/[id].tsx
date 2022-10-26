import type { NextPage } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

//https://nextjs.org/docs/basic-features/typescript
import { GetStaticProps, GetStaticPaths } from 'next';

// pages/users/[id].js
export const getStaticPaths: GetStaticPaths = async () => {

    const usersReq: any = await axios.get('https://reqres.in/api/users');
    const users: User[] = usersReq.data.data;

    const paths = users.map((user) => ({
        params: {
            id: user.id.toString()
        }
    }));

    return {
        paths,
        fallback: false
    };

}

export const getStaticProps: GetStaticProps = async (context) => {

    const id = context!.params!.id;
    const userReq = await axios.get(`https://reqres.in/api/users/${id}`);

    if (userReq.status === 404) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            user: userReq.data.data
        }
    };
}

interface User {
    avatar: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
}


//https://stackoverflow.com/questions/69560905/how-to-type-a-page-component-with-props-in-next-js
//https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript
//https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
const UserPage: NextPage<{ user: User }> = (props) => {
    const user = props.user;
    return (
        <div>
            <div>
                <Link href="/" passHref>Back to home</Link>
            </div>
            <hr />
            <div style={{ display: 'flex' }}>
                <img
                    src={user.avatar}
                    alt={user.first_name}
                    width={150}
                    height={150}
                />
                <div>
                    <div>
                        <b>Full name:</b>
                        {user.first_name} {user.last_name}
                    </div>
                    <div>
                        <b>Email:</b> {user.email}
                    </div>
                </div>
            </div>
        </div>
    );






}

export default UserPage;