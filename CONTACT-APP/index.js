import express from "express";
const app = express();
import { connectDB } from "./config/database.js";
import contactRouter from "./Routes/contact.routes.js";

const PORT = process.env.PORT

//database connection
connectDB();

//middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//Rounts
app.use("/", contactRouter);

app.listen(PORT, () => {
  console.log(`serves started successflly on port ${PORT}.`);
});
