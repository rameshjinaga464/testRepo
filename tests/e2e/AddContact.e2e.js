const {
  randomFirstName,
  randomLastName,
  randomEmail,
  randomWord,
} = require('../../helpers/DataHelper');

let dashboardPage;
let addContact;
let contactPage;
let manageContactPage;

let testData;

module.exports = {
  before: ({ page }) => {
    dashboardPage = page.DashboardPage();
    addContact = page.AddAContactPage();
    contactPage = page.ContactsPage();
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

  "Should click on topNavMenu and click on contacts": ({ contacts }) => {
    contacts.addContact(firstName, lastName, email);
  },

  "Should delete the newly created contact": ({ tearDown }) => {
    tearDown.removeContact(firstName, lastName);
  },

  after: ({ currentTest, tearDown }) => {
    if (currentTest.results.failed > 0) {
      tearDown.removeContact(firstName, lastName);
    }
  },
};
