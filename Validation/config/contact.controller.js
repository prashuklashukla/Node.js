const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  city: String,
  age: Number
});

const User = mongoose.model("User", userSchema);

module.exports = User;   // 👈 export model
