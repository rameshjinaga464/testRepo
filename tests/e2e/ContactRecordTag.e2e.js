let dashboardPage;
let addAContactPage;
let contactsPage;

var faker = require('faker');
var firstName = faker.name.firstName();
var lastName = faker.name.lastName();
var email = faker.internet.email();

var actionDescriptionInput = faker.commerce.productDescription();
var actionDate = faker.date.between();
var completionDate = faker.date.future();
var creationNotes = faker.company.catchPhraseDescriptor();

module.exports = {
  before: ({ page }) => {
    dashboardPage = page.DashboardPage();
    addAContactPage = page.AddAContactPage();
    contactsPage = page.ContactsPage();
    manageNotePage = page.ManageNotePage();
  },
  'Should Login ': function ({ auth }) {
    auth.login();
  },

  'go to CRM > Contacts': () => {
    dashboardPage
      .click('@topNavMenu')
      .clickNavItem('Contacts')
      .assert.title('Contacts');
    addAContactPage
      .waitForElementVisible('@addAContactButton', 5000)
      .click('@addAContactButton')
      .assert.urlContains('contact/create');
  },

  'Should add a test contact': () => {
    addAContactPage
      .setValue('@firstNameInput', firstName)
      .setValue('@lastNameInput', lastName)
      .setValue('@emailInput', email)
      .selectOption('Contact0Phone1Type', 'Home')
      .click('@saveButton')
      .assert.elementPresent('@companyInput');
  },
  'Should filter contact list by test contact email': () => {
    contactsPage
      .setValue('@mainSearchDataInput', email)
      .waitForElementVisible('@clickOnmainSearchDataInput', 8000)
      .click('@clickOnmainSearchDataInput')
      .assert.title('Quick Search');
  },
  'Should open contact record': () => {
    contactsPage
      .waitForElementVisible('@searchresultContactLink', 8000)
      .click('@searchresultContactLink')
      .assert.title(firstName + ' ' + lastName)
      .pause(3000);
  },
  'should click on tag section and create new tag with a new tag category':
    () => {
      contactsPage
        .click('@tagTab')
        .waitForElementVisible('@createNewTagButton', 5000)
        .click('@createNewTagButton');
    },
  'should fill the details and apply tag to contact': () => {
    contactsPage
      .setValue('@tagNameInput', firstName)
      .selectOption('ContactGroupDb0GroupCategoryId', 'testing category')
      .click('@createApplyTagButton');
  },
  'should verify tag details and remove tag from contact': () => {
    contactsPage
    //.waitForElementVisible('@verifyTagName', 10000)
     // .containsText('@verifyTagName', firstName)
      .click('@removeTagButton');
  },
  'Should delete test contact': () => {
    contactsPage.assert
      .title(firstName + ' ' + lastName)
      .waitForElementVisible('@deleteButton', 8000)
      .click('@deleteButton') //Contact Delete
      .api.acceptAlert()
      .pause(3000);
  },
};
