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
    likes: [String]!
    dislikes: [String]!
  }
  type Query {
    helloWorld: String
    getAllUsers: [User]
    getUser(userId: ID!): User
    getAllPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    addPost(title: String!, description: String!): Post!
    deletePost(postId:ID!):Post!
    likePost(postId: ID!): Boolean
    dislikePost(postId: ID!): Boolean
  }
`;

module.exports = typeDefs;
