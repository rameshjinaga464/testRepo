let dashboardPage;
let addAContactPage;
let contactsPage;
let manageAppointmentPage;
let manageContactPage;

var faker = require('faker');
var firstName = faker.name.firstName();
var lastName = faker.name.lastName();
var email = faker.internet.email();

var actionDescriptionInput = faker.commerce.productDescription();
var apptDate = faker.date.between();
var apptEnd = faker.date.future();
var creationNotes = faker.company.catchPhraseDescriptor();

module.exports = {
  before: ({ page }) => { 
    dashboardPage = page.DashboardPage();
    addAContactPage = page.AddAContactPage();
    contactsPage = page.ContactsPage();
    manageAppointmentPage = page.ManageAppointmentPage();
    manageContactPage = page.ManageContactPage();
  },
  'Should Login Should login & go to CRM > Contacts': function ({ auth }) {
    auth.login();
    dashboardPage
      .click('@topNavMenu')
      .clickNavItem('Contacts')
      .assert.title('Contacts');
    addAContactPage.waitForElementVisible('@addAContactButton', 5000)
      .click('@addAContactButton')
      .assert.urlContains('contact/create');
  },

  'Should add a test contact': () => {
    addAContactPage.setValue('@firstNameInput', firstName)
      .setValue('@lastNameInput', lastName)
      .setValue('@emailInput', email)
      .selectOption('Contact0Phone1Type', 'Home')
      .click('@saveButton')
      .assert.elementPresent('@companyInput');
  },
  'Should filter contact list by test contact email': () => {
    contactsPage
      .setValue('@mainSearchDataInput', email)
      .waitForElementVisible('@clickOnmainSearchDataInput',8000)
      .click('@clickOnmainSearchDataInput')
      .assert.title('Quick Search');
  },
  'Should open contact record': () => {
    contactsPage
      .waitForElementVisible('@searchresultContactLink',8000)
      .click('@searchresultContactLink')
      .assert.title(firstName+' '+lastName)
      .pause(3000);
  },

  'Should click add appointments button': () => {
    contactsPage
      .waitForElementVisible('@addAppointmentButton',5000)
      .click('@addAppointmentButton');
  },

  'Should navigate to manage Appointment Page': function ({ windowHandles }) {
    windowHandles.newWindow();
  },

  'Should create new appointment': () => {
    manageAppointmentPage
    .assert.title('Add an Appointment')
      .waitForElementVisible('@actionDescriptionInput',5000)
      .setValue('@actionDescriptionInput', actionDescriptionInput)
      //   .setValue('@apptDate', apptDate)
      //   .setValue('appEnd', apptEnd)
      .setValue('@creationNotes', creationNotes)
      .click('@saveButton')
      
  },

  'Should Navigate to Default Window': ({ windowHandles }) => {
    windowHandles.defaultWindow();

  },
  'Should edit appointment': ({ windowHandles }) => {
    manageContactPage
    .assert.title(firstName+' '+lastName)
    .click('@editAppointmentLink');
    windowHandles.newWindow();
  },

  'Should delete appointment': ({ windowHandles }) => {
    manageAppointmentPage
      .assert.title('Appointment')
      .waitForElementVisible('@deleteButton',5000)
      .click('@deleteButton') //delete Appointment
      .api.acceptAlert();
    windowHandles.defaultWindow();
  },

  'Should delete test contact': ({ windowHandles }) => {
    manageContactPage
      .assert.title(firstName+' '+lastName)
      .waitForElementVisible('@deleteButton',5000)
      .click('@deleteButton') //Contact Delete
      .api.acceptAlert()
      .pause(3000);
  },
};
