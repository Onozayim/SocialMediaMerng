const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  userName: String,
  password: String,
  email: String,
  createdAt: String,
});

const User = model("User", userSchema);

module.exports = { User };
