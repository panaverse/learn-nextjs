import Link from 'next/link';
import { useQuery } from '@apollo/client';
import GET_ROCKETS from '../lib/apollo/queries/getRockets';

export interface Rocket {
  id: string,
  name: string,
  country: string,
  description: string,
  active: string,
  company: string,
}

export interface RocketsInterface {
  rockets: Rocket[]
}

function HomePage() {
  const { loading, data } = useQuery<RocketsInterface>(GET_ROCKETS, {
    fetchPolicy: 'no-cache',
  });
  // console.log("data ", data);

  if (loading) {
    return <div>Loading . . .</div>;
  }

  return (
    <div>
      <div>Rocket list</div>
      <br /> <br />
      <div>Rendered on client side </div>
      <br /> <br />
      <div>
        {data?.rockets.map((rocket, index) => (
          <div key={index} style={{cursor: "pointer"}}>
            <Link href={`/rocket/${rocket.id}`} passHref >
              <p> {index + 1 }: <a style={{textDecoration: "underline"}}> {rocket.name} </a> </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;