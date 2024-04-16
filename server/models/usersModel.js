const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  friends: { type: Array, default: [] }

});

module.exports = model("Users", UsersSchema);