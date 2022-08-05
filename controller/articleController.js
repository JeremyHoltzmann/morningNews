const { articleModel } = require("../models/articleModel");

var userModel = require("../models/articleModel").articleModel;

var articleController = {
  addArticle: async (title, description, content, img) => {
    var article = await articleModel.findOne({ title: title });
    if (article != null) {
      return article;
    } else {
      var article = new articleModel({
        title: title,
        description: description,
        content: content,
        img: img,
      });
      var savedArticle = await article.save();
      return savedArticle;
    }
  },
};

module.exports = articleController;
