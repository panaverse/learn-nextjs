import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoginPage: NextPage = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) {
      router.push('/private')
    }
  }, [loggedIn]);

  return (
    <div>
      This is a Login Page
      <br />
      <br />
      <button onClick={() => setLoggedIn(true)}>Login</button>
    </div>
  )
}

export default LoginPage