import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      userName
      likeCount
      commentCount
      original
      likes {
        userName
      }
      comments {
        id
        userName
        createdAt
        body
      }
    }
  }
`;

export const FETCH_COMMENTS_QUERY = gql`
  query getComments($answeringId: ID!) {
    getComments(answeringId: $answeringId) {
      body
      commentCount
      createdAt
      id
      likeCount
      original
      userName
      answeringTo {
        id
        userName
        body
      }
      likes {
        userName
      }
      mainPost {
        id
        body
      }
    }
  }
`;
