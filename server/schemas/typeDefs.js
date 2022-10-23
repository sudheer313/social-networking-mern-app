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
    likesCount: Int!
  }

  type Comment {
    _id: ID!
    authorId: ID!
    postId: ID!
    description: String!
  }
  type Query {
    helloWorld: String
    getAllUsers: [User]
    getUser(userId: ID!): User
    getAllPosts: [Post]
    getAllTrendingPosts: [Post]
    getPost(postId: ID!): Post
    getComments(postId:ID!):[Comment!]
  }
  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    addPost(title: String!, description: String!): Post!
    deletePost(postId: ID!): Post!
    likePost(postId: ID!): Boolean
    dislikePost(postId: ID!): Boolean
    addComment(postId: ID!, description: String!): Comment!
    deleteComment(commentId: ID!): Comment!
  }
`;

module.exports = typeDefs;
