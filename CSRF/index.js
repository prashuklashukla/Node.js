const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const csurf = require("csurf");

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
const csurprotection = csurf({
  cookie: true,
});

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.get("/myform", csurprotection, (req, res) => {
  res.render("myform", { csrfToken: req.csrfToken() });
});

app.post("/submit", csurprotection, (req, res) => {
  res.send(req.body);
});

app.listen(8000, () => {
  console.log("app runing on port 8000");
});
