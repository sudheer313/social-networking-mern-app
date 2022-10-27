import { gql } from '@apollo/client';

const QUERY_ALLPOSTS=gql`
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

export {QUERY_ALLPOSTS};
