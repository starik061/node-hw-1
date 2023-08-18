const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const targetBook = contacts.find((contact) => contact.id === contactId);

  return targetBook || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (removedContactIndex === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(removedContactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

async function addContact(name, email, phone) {
  // ...твой код. Возвращает объект добавленного контакта.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

// (async () => {
//   const a = await addContact("1", "2", "3");
//   console.log(a);
// })();
