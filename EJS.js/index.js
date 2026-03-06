import express from "express";
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("wellcome to home");
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Student List",
    message: "Here is the information of students",
    students: [
      { name: "Ankur", course: "BCA", marks: 85 },
      { name: "Ravi", course: "BSc IT", marks: 78 },
      { name: "Sneha", course: "BBA", marks: 90 },
    ],
  });
});

app.get("/form", (req, res) => {
  res.render("form", { message: null });
});

app.post("/submit", (req, res) => {
  const name = req.body.myname;

  const message = `Hello, ${name} you submit the form.`;
  res.render("form", { message: message });
});

app.listen(3000, () => {
  console.log("server starts successfully on port :3000 ");
});
