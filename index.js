const { Command } = require("commander");

const contactsAPI = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      const contactsList = await contactsAPI.listContacts();
      console.table(contactsList);
      break;
    }

    case "get": {
      const contact = await contactsAPI.getContactById(id);
      console.log(contact);
      break;
    }

    case "add": {
      const newContact = await contactsAPI.addContact(name, email, phone);
      console.log(newContact);
      break;
    }

    case "remove": {
      const removedContact = await contactsAPI.removeContact(id);
      console.log(removedContact);
      break;
    }

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// (async () => {
//   const a = await contactsAPI.addContact("1", "2", "3");
//   console.log(a);
// })();
