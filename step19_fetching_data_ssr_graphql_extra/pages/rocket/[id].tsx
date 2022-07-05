import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import React from 'react'
import { Rocket } from '..';
import { initApollo } from '../../lib/apollo';
import GET_ROCKET from '../../lib/apollo/queries/getRocket';

const client = initApollo();

interface RokcetInterface {
  rocket: Rocket
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log("id ", context!.params!.id);
  const rocketId = context!.params!.id;
  const { data } = await client.query<RokcetInterface>({ query: GET_ROCKET, variables: { rocketId } });
  // console.log("data ", data);
  return {
    props: {
      rocket: data.rocket
    }
  };
}



const Rocket: NextPage<RokcetInterface> = (props) => {
  const rocket = props.rocket;
  console.log("props", rocket)
  return (
    <div>

      <div>Rendered on Server Side</div>

      <br /> <br />
      <Link href="/" passHref>Back to home</Link>
      <br /> <br />

      <div>Rocket Detail</div>
      <div>ID: {rocket.id}</div>
      <div>Name: {rocket.name}</div>
      <div>Comapany: {rocket.company}</div>
      <div>Country: {rocket.country}</div>
      <div>Status: {rocket.active}</div>
      <div>Description: {rocket.description}</div>
    </div>
  )
}

export default Rocket