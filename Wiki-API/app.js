const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const port = 3000;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
  Article.find((err, foundArticles) => {
    if (err) {
      res.send(err);
    } else {
      res.send(foundArticles);
    }
  });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
