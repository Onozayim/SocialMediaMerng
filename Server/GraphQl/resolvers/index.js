const postResolvers = require("./posts");
const userResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent) => {
      return parent.likes.length;
    },
    commentCount: (parent) => {
      return parent.comments.length;
    },
  },
  Query: {
    ...postResolvers.Query,
    ...commentsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};
