const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: (req, fileLoader, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname == "userfile") {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      cb(null, true);
    } else {
      cb(new Error("only image allows "), false);
    }
  } else if (file.fieldname == "filedocument") {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("only image allows "), false);
    }
  } else {
    cb(new Error("unknow file "), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  fileFilter: fileFilter,
});

app.get("/", (req, res) => {
  res.render("myform");
});

// app.post("/submitform", upload.array("userfile", 3), (req, res) => {
//   if (!req.files || req.files.length == 0) {
//     return res.status(404).send(`No file upload`);
//   }
//   res.send( req.files);
// });

app.post(
  "/submitform",
  upload.fields([
    { name: "userfile", maxCount: 1 },
    { name: "filedocument", maxCount: 3 },
  ]),
  (req, res) => {
    if (!req.files || req.files.length == 0) {
      return res.status(404).send(`No file upload`);
    }
    res.send(req.files);
  },
);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).send(`Too many file upload at one `);
    }
    return res.status(400).send(`Multer error ${error.message} ${error.code}`);
  } else if (error) {
    return res.status(500).send(`Something want wrong ${error.message}`);
  }
  next();
});

app.listen(3000, () => {
  console.log("app runing on port no. 3000");
});
