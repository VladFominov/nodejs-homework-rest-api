const { Contact } = require("../models/contact.model");

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getByIdContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res.status(404).json({ massage: "Not Found" });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
  }
};

const appendContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({
    name,
    email,
    phone,
  });
  res.json(newContact).status(201);
};

const deletContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      res.status(404).json({ massage: "Not Found" });
    }
    res.json({ message: `a contact with id ${contactId} deleted` });
  } catch (err) {
    console.error(err);
  }
};

const updContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedStatusContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    res.json(updatedStatusContact);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getContacts,
  getByIdContact,
  appendContact,
  deletContact,
  updContact,
  updateStatusContact,
};
