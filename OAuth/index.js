const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("./auth/google");
const app = express();
const port = 3000;

//session setup
app.use(
  session({
    secret: "MYSECRETKEY",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

function authcheck(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
}

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Login with google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/profile",
  }),
);

app.get("/profile",authcheck, (req, res) => {
  console.log(req.user);
  res.send(`<h1>Wellcome ${req.user.displayName}</h1>
    <img src="${req.user.photos[0].value}">
    <a href="/logout">Logout</a>
    `);
});

app.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
