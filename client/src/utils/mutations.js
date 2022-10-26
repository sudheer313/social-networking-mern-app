import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation registerUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      _id
      email
      token
      username
    }
  }
`;
export { ADD_USER };
