const fs = require('fs/promises')
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
try {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
} catch (err) {
  console.error(err);
}
}

const getContactById = async (contactId) => {

    try {
      const contacts = await listContacts();
      const theContact = contacts.find((contact) => contact.id === contactId);
      
      return theContact;
    } catch (err) {
      console.error(err);
    }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
      contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (err) {
    console.error(err);
  }
  return true;
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    contacts.push( body );
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  console.log(body)
  try {
     const contacts = await listContacts();
     const contact = contacts
      .findIndex((contact) => contact.id === Number(contactId));
    contacts[contact] = {...contacts[contact], ...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
