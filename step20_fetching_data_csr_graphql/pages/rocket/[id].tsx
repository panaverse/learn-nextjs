import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react'
import { Rocket} from '..';
import GET_ROCKET from '../../lib/apollo/queries/getRocket';

import { useRouter } from 'next/router';


interface RokcetInterface {
  rocket: Rocket
}

const Rocket: NextPage = () => {

  const { query } = useRouter();
  console.log("query ", query);

  const { loading, data } = useQuery<RokcetInterface>(GET_ROCKET, {
    fetchPolicy: 'no-cache',
    variables: { rocketId: query.id }
  });
  // console.log("data ", data);


  if (loading) {
    return <div>Loading . . .</div>;
  }

  return (
    <div>

      <div>Rendered on client side </div>

      <br /> <br />
      <Link href="/" passHref>Back to home</Link>
      <br /> <br />

      <div>Rocket Detail</div>
      {
        data && data.rocket && (
          <>
            <div>ID: {data.rocket.id}</div>
            <div>Name: {data.rocket.name}</div>
            <div>Comapany: {data.rocket.company}</div>
            <div>Country: {data.rocket.country}</div>
            <div>Status: {data.rocket.active}</div>
            <div>Description: {data.rocket.description}</div>
          </>
        )
      }
    </div>
  )
}

export default Rocket