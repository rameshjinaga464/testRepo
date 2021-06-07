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
    const { firstName, lastName, testEmail } = testData.contactData;
    console.log(firstName);
    console.log(lastName);
    console.log(testEmail);
    contacts.addContact(firstName, lastName, testEmail);
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
