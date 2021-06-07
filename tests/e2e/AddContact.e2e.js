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
    console.log('Login step++++');
    auth.login();
  },

  "Should click on topNavMenu and click on contacts": ({ contacts }) => {
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
