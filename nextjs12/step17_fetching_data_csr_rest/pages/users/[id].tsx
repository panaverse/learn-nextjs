import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

//https://nextjs.org/docs/basic-features/typescript
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    return {
        props: {
            id
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

function UserData({ user }: { user: User }) {

    return (
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
    )
}

const UserPage: NextPage<{ id: string }> = (props) => {

    const id = props.id;
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<User>();

    const getUserData = async () => {
        // Making get request on backend
        const req = await fetch(`/api/singleUser?id=${id}`);
        const data = await req.json();
        setLoading(false);
        setData(data);
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