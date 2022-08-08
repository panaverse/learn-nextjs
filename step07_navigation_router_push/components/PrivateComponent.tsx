import Link from 'next/link';
import type { NextComponentType, NextPageContext } from "next";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

//https://bestofreactjs.com/repo/avneesh0612-react-nextjs-snippets

interface Props {};

const PrivateComponent: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
    const [loggedIn, setLoggedIn] = useState(true);
    const router = useRouter();
  
    useEffect(() => {
      if (!loggedIn) {
        router.push('/login')
      }
    }, [loggedIn]);

    return (
        <div>
           This is private component.
           <br />
           <br />
           <button onClick={() => setLoggedIn(false)}>Logout</button>
        </div>
    );
};
export default PrivateComponent;

