const express = require("express");
const app = express();
const session = require("express-session");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./model/user.model");

//database
mongoose
  .connect("mongodb://127.0.0.1:27017/user-crud")
  .then(() => console.log("connected!"));

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
  }),
);

const checkLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

//Routes
app.get("/", checkLogin, (req, res) => {
  res.send(`<h1>Home page</h1> <p>Your ${req.session.user}</p>
    <a href="/logout">logout</a>
    `);
});

app.get("/profile-page", checkLogin, (req, res) => {
  res.send(`<h1>profile page</h1> <p>Hello ${req.session.user}</p>
    <a href="/logout">logout</a>
    `);
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    res.render("login", { error: null });
  }
});

app.get("/sigup", (req, res) => {
  res.render("sigup", { error: null });
});

app.post("/sigup", async (req, res) => {
  const { username, userpassword } = req.body;
  const hasedpassword = await bcrypt.hash(userpassword, 10);

  // res.send({ username, userpassword: hasedpassword });
  await User.create({ username, userpassword: hasedpassword });
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, userpassword } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.render("login", { error: "user not found" });

  const isMatch = await bcrypt.compare(userpassword, user.userpassword);
  if (!isMatch) return res.render("login", { error: "invaild password" });

  req.session.user = username;

  res.redirect("/");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.listen(3000, () => {
  console.log("serves is runing on port no 3000");
});
