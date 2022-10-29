import { gql } from "@apollo/client";

const QUERY_ALLPOSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      authorId
      title
      description
      likes
      dislikes
      likesCount
    }
  }
`;

const QUERY_ALLTRENDINGPOSTS = gql`
  query GetAllTrendingPosts {
    getAllTrendingPosts {
      _id
      authorId
      title
      description
      likes
      dislikes
      likesCount
    }
  }
`;

const QUERY_SINGLEUSER = gql`
  query Query($userId: ID!) {
    getUser(userId: $userId) {
      _id
      username
      email
      postsCount
      bio
      followers
      followingUsers
    }
  }
`;

const QUERY_ALLUSERS = gql`
  query Query($userId: ID!) {
    getUser(userId: $userId) {
      _id
      username
      email
      postsCount
      bio
      followers
      followingUsers
    }
  }
`;

// const QUERY_GETPOSTBYSEARCH = gql`
// getPostBysearch(searchQuery: $searchQuery) {
//   _id
//   authorId
//   title
//   description
//   likes
//   dislikes
//   likesCount
//   author {
//     username
//     email
//     postsCount
//   }
//   commentsCount
// }
// }
// `;

export {
  QUERY_ALLPOSTS,
  QUERY_ALLTRENDINGPOSTS,
  QUERY_SINGLEUSER,
  QUERY_ALLUSERS,
  
};
