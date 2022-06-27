import type { NextPage } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

//https://nextjs.org/docs/basic-features/typescript
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';


export const getServerSideProps: GetServerSideProps = async (context) => {
  const usersReq = await axios.get('https://api.rwnjs.com/04/users')
  return {
    props: {
      users: usersReq.data
    }
  }
}



//https://stackoverflow.com/questions/69560905/how-to-type-a-page-component-with-props-in-next-js
//https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript
//https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props
const Home: NextPage<GetServerSideProps> = (props: GetServerSideProps) => {
  let users = props.users;
  return (
    <ul>
    {
      users.map((user) =>
        <li key={user.id}>
          <Link href={`/users/${user.username}`} passHref >
            <a> {user.username} </a>
          </Link>
        </li>
      )
    }
    </ul>
  )
}

export default Home;


