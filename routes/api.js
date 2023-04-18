var express = require("express");
var router = express.Router();

router.get("/top_headlines", async function (req, res, next) {
  var message = await fetch(
    `https://newsapi.org/v2/top-headlines/sources?apiKey=${process.env.NEWSAPI_KEY}&language=${req.query.language}`
  );
  message = await message.json();
  res.send(message);
});

router.get("/articlesBySource", async function (req, res, next) {
  console.log("req.query.id", req.query.sources);
  var message = await fetch(
    `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWSAPI_KEY}&language=${req.query.language}&sources=${req.query.sources}&pageSize=100`
  );

  message = await message.json();
  console.log("message", message);
  res.send(message);
});

module.exports = router;
