import type { NextPage } from 'next';
import Link from 'next/link';
import axios from 'axios';

//https://nextjs.org/docs/basic-features/typescript
import { GetServerSideProps } from 'next';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    // const userReq = await axios.get(`${process.env.API_ENDPOINT}/04/users/${username}`);
    const userReq = await axios.get(`https://reqres.in/api/users/${id}`);

    if (userReq.status === 404) {
        //console.log("ERROR");
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
    const {user} = props;
    console.log("user: ", user)
    return (
        <div>
            <div>
            <Link href="/" passHref>Back to home</Link>
            </div>
            <hr />
            <div style={{ display: 'flex' }}>
                <Image
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