const { gql } = require("graphql-tag");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    userName: String!
    comments: [Post]!
    likes: [Like]!
    original: Boolean!
    answeringTo: Post
    mainPost: Post
    likeCount: Int!
    commentCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    userName: String
    createdAt: String
  }

  type User {
    id: ID!
    email: String!
    token: String!
    userName: String!
    createdAt: String!
  }

  input RegisterInput {
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getComments(answeringId: ID!): [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userName: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!, mainPostID: ID!): Post!
    deleteComment(postID: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

module.exports = { typeDefs };
