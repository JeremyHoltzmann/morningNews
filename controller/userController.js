var fetch = require("node-fetch");
var userModel = require("../models/userModel").userModel;

var bcrypt = require("bcrypt");
var uid2 = require("uid2");

var articleController = require("./articleController");

const CRYPTTURN = 10;

var userController = {
  addUser: async (userName, email, password) => {
    var user = await userModel.findOne({ email: email });
    if (user != null) {
      return { result: false, message: "Email already existing" };
    } else {
      var user = new userModel({
        userName: userName,
        email: email,
        password: bcrypt.hashSync(password, CRYPTTURN),
        token: uid2(32),
      });
      await user.save();
      return { result: true, message: "Ok", data: { user: user } };
    }
  },
  signIn: async (email, password) => {
    var user = await userModel.findOne({ email: email });
    if (!user) return { result: false, message: "No user found" };
    await user.populate("articles");
    if (bcrypt.compareSync(password, user.password)) {
      return { result: true, message: "Ok", data: { user } };
    } else {
      return { result: false, message: "Wrong email or password" };
    }
  },

  addArticle: async (
    token,
    articleTitle,
    articleDescription,
    articleContent,
    articleImg
  ) => {
    var user = await userModel.findOne({ token: token });

    if (!user) return null;

    var article = await articleController.addArticle(
      articleTitle,
      articleDescription,
      articleContent,
      articleImg
    );
    user.articles.push(article._id);
    await user.save();
  },

  addArticle: async (
    token,
    articleTitle,
    articleDescription,
    articleContent,
    articleImg
  ) => {
    var user = await userModel.findOne({ token: token });

    if (!user) return null;
    var article = await articleController.addArticle(
      articleTitle,
      articleDescription,
      articleContent,
      articleImg
    );
    user.articles.push(article._id);
    await user.save();
  },

  removeArticle: async (token, articleId) => {
    var user = await userModel.findOne({ token: token });

    await user.populate("articles");
    user.articles = user.articles.filter((element) => element._id != articleId);
    await user.save();
  },
};

module.exports = userController;
