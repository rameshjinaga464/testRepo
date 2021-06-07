const {
  randomFirstName,
  randomLastName,
  randomEmail,
  randomWord,
} = require('../../helpers/DataHelper');

let addContact;
let contactPage;
let dashboardPage;
let manageContactPage;

let testData;

module.exports = {
  before: ({ page }) => {
    addContact = page.AddAContactPage();
    contactPage = page.ContactsPage();
    dashboardPage = page.DashboardPage();
    manageContactPage = page.ManageContactPage();

    testData = {
      contactData: {
        firstName: randomFirstName(),
        lastName: randomLastName(),
        testEmail: randomEmail(),
      },
      tagData: {
        tagName: randomWord(),
      },
    };
  },

  "Should login": function ({ auth }) {
    auth.login();
  },

  "Should create a new contact": ({ contacts }) => {
    const { contactData } = testData;

    contacts.addContact(contactData);
  },

  "Should delete the newly created contact": ({ tearDown }) => {
    const { firstName, lastName } = testData.contactData;

    tearDown.removeContact(firstName, lastName);
  },

  after: ({ currentTest, tearDown }) => {
    if (currentTest.results.failed > 0) {
      const { firstName, lastName } = testData.contactData;

      tearDown.removeContact(firstName, lastName);
    }
  },
};
