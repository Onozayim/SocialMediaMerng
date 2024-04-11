const { UserInputError, AuthenticationError } = require("apollo-server");

const { Post } = require("../../models/Post");
const { checkAuth } = require("../../util/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (parent, { postId, body, mainPostID }, context) => {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        const comment = new Post({
          original: false,
          mainPost: mainPostID,
          answeringTo: post.id,
          body,
          userName: user.userName,
          user: user.id,
          createdAt: new Date().toISOString(),
        });

        post.comments.push(comment.id);

        if (postId !== mainPostID) {
          const Originalpost = await Post.findById(mainPostID);
          Originalpost.comments.push(comment.id);
          await Originalpost.save();
        }

        await post.save();
        await comment.save();
        return Post.findById(comment.id)
          .populate("comments")
          .populate("answeringTo")
          .populate("mainPost");
      }
    },
  },
  Query: {
    getComments: async (parent, { answeringId }, context) => {
      try {
        const comments = await Post.find({ mainPost: answeringId })
          .populate("comments")
          .populate("answeringTo")
          .populate("mainPost");

        if (comments) {
          return comments;
        } else {
          throw new Error("Comments not found");
        }
      } catch (err) {
        throw err;
      }
    },
  },
};
