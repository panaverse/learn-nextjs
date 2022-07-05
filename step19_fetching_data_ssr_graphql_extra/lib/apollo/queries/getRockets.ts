import { gql } from "@apollo/client";
const GET_ROCKETS = gql`
query Rockets {
    rockets(limit: 10) {
        id,
        name,
        country,
        description,
        active,
        company
    }
  }`;
    
export default GET_ROCKETS;