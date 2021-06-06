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
    console.log('firstName from faker=======>' + testData.contactData.firstName);
    console.log('lastName from faker=========>' + testData.contactData.lastName);
    console.log('testEmail from faker========>' + testData.contactData.testEmail);
    console.log('testEmail from faker========>' + testData.tagData.tagName);
  },

  "Should click on topNavMenu and click on contacts": ({ contacts }) => {
    contacts.addContact(firstName, lastName, email);
    // dashboardPage
    //   .waitForElementVisible('@topNavMenu')
    //   .click('@topNavMenu')
    //   .clickNavItem('Contacts')
    //   .assert.title('Contacts');
  },

  // 'Should click on Add a Contact Button': () => {
  //   addContact
  //     .waitForElementVisible('@addAContactButton', 5000)
  //     .click('@addAContactButton');
  // },

  // 'Should enter Contact details': () => {
  //   addContact
  //     .setValue('@firstNameInput', firstName)
  //     .setValue('@lastNameInput', lastName)
  //     .setValue('@emailInput', email)
  //     .selectOption('Contact0Phone1Type','Home')

  //     .setValue('@phone1Input','9700605005')
  //     .click('@saveButton');

  // },
  // 'Should enter additional Contact Details': () => {
  //   addContact.setValue('@companyInput', 'OJAS').click('@finalSaveButton');
  // },

  // 'should navigate back to search results': () => {
  //   addContact
  //     .waitForElementVisible('@backToSearchResults')
  //     .click('@backToSearchResults')
  //     .pause(5000);
  // },

  "Should delete the newly created contact": ({ tearDown }) => {
    // manageContactPage
    //   .waitForElementVisible("@deleteButton", 5000)
    //   .click("@deleteButton")
    //   .api.acceptAlert()
    //   .pause(5000);
    tearDown.removeContact(firstName, lastName);
  },

  after: ({ currentTest, tearDown }) => {
    if (currentTest.results.failed > 0) {
      tearDown.removeContact(firstName, lastName);
    }
  },
};
