import { gql } from "@apollo/client";

const GET_ROCKET = gql`
query Rocket($rocketId: ID!){
    rocket(id: $rocketId) {
      id
      name,
      country, 
      description
      active,
      company,
  
    }
  }`;
    
export default GET_ROCKET;