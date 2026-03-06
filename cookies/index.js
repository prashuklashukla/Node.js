const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");

app.use(cookieparser("prashant123"));

app.get("/", (req, res) => {
  let home = "Home page";
  const username = req.signedCookies.username;
  if (username) {
    res.send(`${home}: cookie found: ${username} `);
  } else {
    res.send(`${home}: No cookie found`);
  }
});

app.get("/set-cookie", (req, res) => {
  res.cookie("username", "prashant", {
    maxAge: 1000 * 60 * 10,
    httpOnly: true,
    signed: true,
  });
  res.send("cookie has be set");
});

app.get("/get-cookie", (req, res) => {
  const username = req.signedCookies.username;
  if (!username) {
    res.send("No cookie found");
  } else {
    res.send(`cookie found: ${username}`);
  }
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("cookie has successful delete");
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
