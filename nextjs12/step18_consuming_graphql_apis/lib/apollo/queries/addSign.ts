import { gql } from "@apollo/client";
const ADD_SIGN = gql`
mutation InsertNewSign(
    $nickname: String!,
    $content: String!,
    $country: String
    ) {
        insert_sign(objects: {
            nickname: $nickname,
            country: $country,
            content: $content
        }) {
            returning {
                uuid
            }
        }
    }
`;

export default ADD_SIGN;