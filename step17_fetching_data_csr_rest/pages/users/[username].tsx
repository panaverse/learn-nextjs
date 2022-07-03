import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

//https://nextjs.org/docs/basic-features/typescript
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

declare var process : {
    env: {
        API_TOKEN: string,
        API_ENDPOINT: string
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { username } = context.query;
    return {
        props: {
            username,
            authorization: process.env.API_TOKEN
            }
    };
}

interface User {
    username: string;
    profile_picture: string;
    first_name: string;
    last_name: string;
    email: string;
    company: string;
    job_title: string;

}

function UserData({ user }: {user: User}) {
    return (
        <div style={{ display: 'flex' }}>
            <img
                src={user.profile_picture}
                alt={user.username}
                width={150}
                height={150}
            />
            <div>
                <div>
                    <b>Username:</b> {user.username}
                </div>
                <div>
                    <b>Full name:</b>
                    {user.first_name} {user.last_name}
                </div>
                <div>
                    <b>Email:</b> {user.email}
                </div>
                <div>
                    <b>Company:</b> {user.company}
                </div>
                <div>
                    <b>Job title:</b> {user.job_title}
                </div>
            </div>
        </div>
    )
}

interface Props {
    username: string;
    authorization: string;
}


const UserPage: NextPage<Props> = (props: Props) => {
    const auth = props.authorization;
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<User | undefined>(undefined);

    const getUserData = async () => {
        const req = await fetch(`https://api.rwnjs.com/04/users/${props.username}`,
            { headers: { auth } }
        );
        const reqData = await req.json();
        setLoading(false);
        setData(reqData);
      }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
            <div>
                <Link href="/" passHref>Back to home</Link>
        </div>
        <hr />
        {loading && <div>Loading user data...</div>}

        {data && <UserData user={data} />}
</div>
);
}





export default UserPage;