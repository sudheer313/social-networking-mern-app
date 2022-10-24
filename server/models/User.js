const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "E-mail is required"],
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  postsCount:{
    type:Number,
    default:0
  },
  bio:{
    type:String,
    maxLength:[500, "must be no more than characters"]
  }
});

module.exports = model("User", userSchema);
