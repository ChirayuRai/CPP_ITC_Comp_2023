const mongoose = require("mongoose");
const nanoid = require("nanoid");
//import { nanoid } from "nanoid";

const UserSchema = new mongoose.Schema({
  // _id: {
  //   type: String,
  //   //default: nanoid(),
  // },

  _id: String, //look into correct implementation of nanoid() to avoid stale id
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  createdAt: Number,

  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const UserModel = mongoose.model("Usero", UserSchema);

module.exports = UserModel;
