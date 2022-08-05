var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  token: String,

  articles: [{ type: mongoose.Types.ObjectId, ref: "articles" }],
});

var userModel = mongoose.model("users", userSchema);

module.exports.userModel = userModel;
module.exports.userSchema = userSchema;
