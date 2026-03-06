import Contact from "../models/contacts.models.js";
import mongoose from "mongoose";

export const datacontact = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;

  const option = {
    page: parseInt(page),
    limit: parseInt(limit),
  };
  // const contacts = await Contact.find();
  const result = await Contact.paginate({}, option);
  // res.send(result);
  res.render("home", {
    totalDocs: result.totalDocs,
    limit: result.limit,
    totalPages: result.totalPages,
     currentPage: result.page,
    counter: result.counter,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
    contacts: result.docs,
  });
};

export const showContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "invaild id " });
  }

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.render("404", { message: "contact not foun" });
    }
    res.render("show-contact", { contact });
  } catch (error) {
    res.render("500", { message: "error" });
  }

  //  res.json(contact);
};
export const addContact = (req, res) => {
  res.render("add-contact");
};

export const updateContact = async (req, res) => {
  await Contact.create(req.body);
  res.redirect("/");
};

export const addAndUpdataContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "invaild id " });
  }
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
};

export const FindContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "invaild id " });
  }

  const contact = await Contact.findById(req.params.id);
  res.render("update-contact", { contact });
};

export const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "invaild id " });
  }

  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
