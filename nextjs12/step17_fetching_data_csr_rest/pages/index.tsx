import axios from 'axios';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

function List({ users }: { users: User[] }) {
  return (
    <ul>
      {
        users.map((user) =>
          <li key={user.id}>
            <Link href={`/users/${user.id}`} passHref>
              <a> {user.first_name} {user.last_name} </a>
            </Link>
          </li>
        )
      }
    </ul>
  )
}


const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<User[]>([]);

  const getUsers = async () => {
    const usersReq: any = await axios.get('https://reqres.in/api/users');
    const users = (usersReq.data.data as User[]);
    setLoading(false);
    setData(users);
  }

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div>
      {loading && <div>Loading users...</div>}
      {data.length > 0 && <List users={data} />}
    </div>
  )
}

export default Home;


