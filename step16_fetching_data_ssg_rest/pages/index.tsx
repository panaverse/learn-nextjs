import type { NextPage } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

//https://nextjs.org/docs/basic-features/typescript
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';


export const getStaticProps: GetStaticProps = async (context) => {
  // const usersReq = await axios.get('https://api.rwn-js.com/04/users') 
  const userReq: any = await axios.get('https://reqres.in/api/users');

  return {
    props: {
      users: userReq.data.data
    }
  }
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
const Home: NextPage<{users: User[]}> = (props) => {

  let users = props.users;
  return (
    <ul>
      {
        users.map((user) =>
          <li key={user.id}>
            <Link href={`/users/${user.id}`} passHref >
              <a> {user.first_name} {user.last_name} </a>
            </Link>
          </li>
        )
      }
    </ul>
  )
}

export default Home;


