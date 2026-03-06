// const express = require("express");
// const app = express();
// const { body, validationResult } = require("express-validator");
// // const User = require("./config/contact.controller");

// // //database
// // const mongoose = require("mongoose");

// // mongoose.connect("mongodb://127.0.0.1:27017/validationDB")
// // .then(() => console.log("MongoDB Connected"))
// // .catch(err => console.log(err));

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// let validationRegistration = [
//   body("username")
//     .notEmpty()
//     .withMessage("username is required")
//     .isLength({ min: 3 })
//     .withMessage("username must be 3 characters long")
//     .trim()
//     .isAlpha()
//     .withMessage("User must contain letter only")
//     .custom((value) => {
//       if (value === "admin") {
//         throw new Error('Username "admin" is not allowed.');
//       }
//       return true;
//     })

//     .customSanitizer((value) => value.toLowerCase()),

//   body("useremail")
//     .isEmail()
//     .withMessage("please provide a valid Email Id")
//     .normalizeEmail(),

//   body("userpassword")
//     .isLength({ min: 3, max: 10 })
//     .withMessage("password must be between 3 to 10 characters long")
//     .isStrongPassword()
//     .withMessage("password must be strong"),

//   body("userage")
//     .isNumeric()
//     .withMessage("Age must be number")
//     .isInt({ min: 18 })
//     .withMessage("Age must be a least 18 years old"),

//   body("usercity")
//     .isIn(["Mumbai", "Delhi", "Pune", "Bangalore"])
//     .withMessage("city must be mumbai,delhi,pune,bangalore"),
// ];

// app.get("/", (req, res) => {
//   res.render("myform.ejs", { errors: 0 });
// });

// app.post("/saveform", validationRegistration, (req, res) => {
//   const errors = validationResult(req);

//   if (errors.isEmpty()) {
//     return res.send(req.body);
//   }

//   res.render("myform", { errors: errors.array() });
// });

// app.listen(3000, () => {
//   console.log("app running on port 3000");
// });


const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("./config/contact.controller");

// Database
mongoose.connect("mongodb://127.0.0.1:27017/validationDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// ✅ Validation Middleware
let validationRegistration = [

  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters")
    .trim()
    .isAlpha().withMessage("Username must contain letters only")
    .custom(value => {
      if (value === "admin") {
        throw new Error('Username "admin" is not allowed');
      }
      return true;
    })
    .customSanitizer(value => value.toLowerCase()),

  body("email")   // ✅ changed to match schema
    .isEmail().withMessage("Please provide valid Email")
    .normalizeEmail(),

  body("password")  // ✅ changed
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .isStrongPassword().withMessage("Password must be strong"),

  body("age")   // ✅ changed
    .isInt({ min: 18 }).withMessage("Age must be at least 18"),

  body("city")  // ✅ changed
    .isIn(["Mumbai", "Delhi", "Pune", "Bangalore"])
    .withMessage("Invalid city selected"),
];


// Show form
app.get("/", (req, res) => {
  res.render("myform", { errors: [] });
});


// ✅ Save form with validation
app.post("/saveform", validationRegistration, async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("myform", { errors: errors.array() });
  }

  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send("Data Saved Successfully ✅");
  } catch (error) {
    console.log(error);
    res.send("Error Saving Data ❌");
  }
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
