const express = require("express");
const app = express();
const session = require("express-session");
const {MongoStore} = require("connect-mongo");

app.use(
  session({
    secret: "mysecretket",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/sessiondb"}),
    cookie: { maxAge: 1000 * 60 * 60 },
  }),
);

app.get("/", (req, res) => {
  if (req.session.username) {
    res.send(`<h1>user name session is ${req.session.username} </h1>`);
  } else {
    res.send("<h1> NO User name found in session</h1>");
  }
});

app.get("/set-username", (req, res) => {
  req.session.username = "Prashant shukla";
  res.send("<h1>User name found in session</h1>");
});

app.get("/get-username", (req, res) => {
  if (req.session.username) {
    res.send(`<h1>user name session is :${req.session.username} </h1>`);
  } else {
    res.send("<h1> NO User name found in session.</h1>");
  }
});

app.get("/destory", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      (res.status(500),
        send("Your session is not delete due to server error."));
    }
    res.send("<h1>successful destory session.</h1>");
  });
});

app.listen(3000, () => {
  console.log("severs is runing on port 3000");
});
