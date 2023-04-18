var mongoose = require("mongoose");
var dotenv = require("dotenv");

dotenv.config();

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DATABASE_CONNEXION_STRING, options);
