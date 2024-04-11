const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  original: Boolean,
  body: String,
  userName: String,
  createdAt: String,
  answeringTo: { type: Schema.Types.ObjectId, ref: "Post" },
  mainPost: { type: Schema.Types.ObjectId, ref: "Post" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  likes: [
    {
      userName: String,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = model("Post", postSchema);

module.exports = { Post };
