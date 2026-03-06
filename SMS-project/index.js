const express = require("express");
const dotenv = require("dotenv");
const twilio = require("twilio");
const app = express();

dotenv.config();
PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const accountSid = process.env.accountSid;
const authTocken = process.env.authTocken;
const client = new twilio(accountSid, authTocken);

app.post("/send-sms", (req, res) => {
  const { to, message } = req.body;
  try {
    const result = client.messages.create({
      body: message,
      from: process.env.FROM_PHONE_NUMBER,
      to: to,
    });

    res.status(200).json({
      sid: result.sid,
      message: "SMS send",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to send SMS",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.render("smspage");
});

app.listen(PORT, () => {
  console.log(`app runing on ${PORT} `);
});
