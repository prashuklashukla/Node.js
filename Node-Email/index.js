const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ankurshukla051@gmail.com",
    pass: "nmedfrsvlvaacfzn",
  },
});

app.post("/send-email", (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const info = transporter.sendMail({
      from: '"Daredevil" <ankurshukla051@gmail.com>',
      to: to,
      subject: subject,
      text: text,
      attachments: [
        {
          filename: "data.pdf",
          path: path.join(__dirname, "files", "data.pdf"),
        },
      ],
    });
    res.json({ message: "Email send successfully", info });
  } catch (error) {
    res.status(500).json({ message: "Fail to send the email" });
  }
});

app.get("/", (req, res) => {
  res.render("mailpage");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
