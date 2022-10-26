import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(username: $username, email: $email, password: $password) {
      _id
      email
      token
      username
    }
  }
`;

const LOGIN_USER=gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
      username
    }
  }
`
export { ADD_USER,LOGIN_USER};
