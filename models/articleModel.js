var mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  img: String,
});

var articleModel = mongoose.model("articles", articleSchema);

module.exports.articleModel = articleModel;
module.exports.articleSchema = articleSchema;
