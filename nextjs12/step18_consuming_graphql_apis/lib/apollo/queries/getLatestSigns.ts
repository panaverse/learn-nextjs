import { gql } from "@apollo/client";
const GET_LATEST_SIGNS = gql`
query GetLatestSigns($limit: Int! = 10, $skip: Int! = 0){
    sign(
        offset: $skip,
        limit: $limit,
        order_by: { created_at: desc }
        ) {
            uuid
            created_at
            content
            nickname
            country
        }
    }
    `;
export default GET_LATEST_SIGNS;