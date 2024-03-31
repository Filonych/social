const { Schema, model } = require("mongoose");

const PostsSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

module.exports = model("Posts", PostsSchema);
