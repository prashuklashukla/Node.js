import express from "express";
const router = express.Router();
import {
  datacontact,
  showContact,
  addContact,
  updateContact,
  FindContact,
  addAndUpdataContact,
  deleteContact,
} from "../controller/contact.controller.js";


router.get("/", datacontact);

router.get("/show-contact/:id", showContact);

router.get("/add-contact", addContact);

router.post("/add-contact", updateContact);

router.get("/update-contact/:id", FindContact);

router.post("/update-contact/:id", addAndUpdataContact);

router.get("/delete-contact/:id", deleteContact);

export default router;
