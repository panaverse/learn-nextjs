import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { initApollo } from '../lib/apollo';
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

const client = initApollo();

// https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<RocketsInterface>({ query: GET_ROCKETS });
  return {
    props: {
      rockets: data.rockets
    }
  }
}



const HomePage: NextPage<RocketsInterface> = (props) => {

  return (
    <div>
      <div>Rocket list</div>
      <br /> <br />
      <div>Rendered on server side </div>
      <br /> <br />
      <div>
        {props?.rockets.map((rocket, index) => (
          <div style={{cursor: "pointer"}}>
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