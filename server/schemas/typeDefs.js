const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    token: ID!
  }

  type Post {
    _id: ID!
    authorId: ID!
    title: String!
    description: String!
  }
  type Query {
    helloWorld: String
    getAllUsers: [User]
    getUser(userId: ID!): User
  }
  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    addPost(title:String!, description:String!):Post!
  }
`;

module.exports = typeDefs;
