const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  friends: { type: Array, default: [] }

});

module.exports = model("Users", UsersSchema);