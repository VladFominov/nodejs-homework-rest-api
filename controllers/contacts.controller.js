const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const getByIdContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ massage: "Not Found" });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
  }
};

const appendContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name) {
      res.status(400).json({ massage: "missing required name field" });
    }
    if (!email) {
      res.status(400).json({ massage: "missing required email field" });
    }
    if (!phone) {
      res.status(400).json({ massage: "missing required phone  field" });
    }
    const id = Date.now();
    const newContact = await addContact({ id, name, email, phone });
    res.json(newContact);
  } catch (err) {
    console.error(err);
  }
};

const deletContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ massage: "Not Found" });
    }
    await removeContact(contactId);
    res.json({ message: `a contact with id ${contactId} deleted` });
  } catch (err) {
    console.error(err);
  }
};

const updContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!req.body) {
      res.status(404).json({ massage: "missing fields" });
    }
    const updatedContact = await updateContact(contactId, req.body);
    res.json(updatedContact);
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
};
