let dashboardPage;
let addAContactPage;
let contactsPage;
let manageTaskPage;

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
    manageTaskPage = page.ManageTaskPage();
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

  'Should click add task button': ({ windowHandles }) => {
    contactsPage.click('@addTaskButton');
    windowHandles.newWindow().assert.title('Add a Task');
    manageTaskPage
      .setValue('@actionDescription', actionDescriptionInput)
      .clearValue('@actionDate')
      //   .setValue('@actionDate', actionDate)
      //   .setValue('@completionDate', completionDate)
      .setValue('@creationNotes', creationNotes)
      .click('@saveButton');
    windowHandles.defaultWindow().assert.title(firstName + ' ' + lastName);
  },

  'Should edit the task': () => {
    contactsPage
      .waitForElementVisible('@openTaskLink', 5000)
      .click('@openTaskLink');
  },

  'Should delete task': ({ windowHandles }) => {
    windowHandles
      .newWindow()
      //.assert.title('Task')
      //.waitForElementVisible('@taskDeleteButton', 10000)
      manageTaskPage.click('@taskDeleteButton')
      .api.acceptAlert()
      
  },

  'Should delete test contact': ({ windowHandles }) => {
    windowHandles.defaultWindow()
    contactsPage
    .assert.title(firstName + ' ' + lastName)
      .waitForElementVisible('@deleteButton', 8000)
      .click('@deleteButton') //Contact Delete
      .api.acceptAlert()
      .pause(3000);
  },
};
