const { AuthenticationError, UserInputError } = require("apollo-server");

const { Post } = require("../../models/Post");
const { checkAuth } = require("../../util/checkAuth");

const deleteComents = async (postID) => {
  await Post.deleteMany({
    original: false,
    answeringTo: postID,
  });
};

const trashData = async () => {
  const posts = await Post.find({ original: false });
  await posts.map((post) => {
    let answer = post._doc.answeringTo;
    delteTrashData(answer, post);
  });
};

const delteTrashData = async (answer, post) => {
  const flag = await Post.findById(answer);
  if (!flag) {
    post.delete();
  }
};

const deleteAnswers = async (postID) => {
  await Post.deleteMany({
    original: false,
    mainPost: postID,
  });
};

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find()
          .populate("comments")
          .populate("answeringTo")
          .populate("mainPost");

        return posts;
      } catch (err) {
        throw err;
      }
    },

    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
          .populate("comments")
          .populate("answeringTo")
          .populate("mainPost");

        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error("Post not found");
      }
    },
  },

  Mutation: {
    async createPost(parent, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post body cant be empty ");
      }

      const newPost = new Post({
        original: true,
        body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },

    async deletePost(parent, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.userName === post.userName) {
          if (post.original === false) {
            deleteComents(post.id);
            console.log("Original is false");
            await post.delete(post.id);
            trashData();
          } else if (post.original === true) {
            deleteAnswers(post.id);
            console.log("Original is true");
            await post.delete(post.id);
          }
          return "Post deleted";
        } else {
          throw new AuthenticationError("Accion not alowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async likePost(parent, { postId }, context) {
      const { userName } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.userName === userName)) {
          //post already like, unlike
          post.likes = post.likes.filter((like) => like.userName !== userName);
        } else {
          //not liked
          post.likes.push({
            userName,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};
