const { Schema, model } = require("mongoose");

const PostsSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  authorId: { type: String, required: true },
  likes: { type: Number, default: 0 },
  _id: {type: String, required: true}
});

module.exports = model("Posts", PostsSchema);
