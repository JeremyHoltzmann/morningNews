var express = require("express");
var router = express.Router();

var userController = require("../controller/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sign-up", async function (req, res, next) {
  var message = await userController.addUser(
    req.body.userName,
    req.body.email,
    req.body.password
  );
  res.json(message);
});

router.post("/sign-in", async function (req, res, next) {
  var message = await userController.signIn(req.body.email, req.body.password);
  res.json(message);
});

router.post("/addArticle", async function (req, res, next) {
  await userController.addArticle(
    req.body.token,
    req.body.title,
    req.body.description,
    req.body.content,
    req.body.img
  );
  res.json("Ok");
});

router.post("/removeArticle", async function (req, res, next) {
  console.log("BODY : ", req.body);
  await userController.removeArticle(req.body.token, req.body.id);
  res.json("Ok");
});

module.exports = router;
