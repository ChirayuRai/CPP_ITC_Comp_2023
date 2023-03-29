const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  username: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
