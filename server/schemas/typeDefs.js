const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    token: ID!
  }
  type Query {
    helloWorld: String
  }
  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
