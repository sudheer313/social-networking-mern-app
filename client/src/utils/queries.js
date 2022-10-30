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
      author {
        username
      }
      commentsCount
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
      author {
        username
      }
      commentsCount
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

const QUERY_RANDOMUSERS = gql`
  query GetRandomUsers {
    getRandomUsers {
      _id
      username
    }
  }
`;

const QUERY_POSTBYSEARCH = gql`
  query GetPostBysearch($searchQuery: String!) {
    getPostBysearch(searchQuery: $searchQuery) {
      _id
      authorId
      title
      description
      likes
      dislikes
      likesCount
      author {
        _id
        username
        email
        postsCount
        bio
        followers
        followingUsers
      }
      commentsCount
    }
  }
`;

export {
  QUERY_ALLPOSTS,
  QUERY_ALLTRENDINGPOSTS,
  QUERY_SINGLEUSER,
  QUERY_RANDOMUSERS,
  QUERY_POSTBYSEARCH,
};
