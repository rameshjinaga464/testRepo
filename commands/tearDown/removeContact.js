const {
  SHORT_TIMEOUT,
  MEDIUM_TIMEOUT,
} = require('../../constants/timeouts');

// eslint-disable-next-line func-names
module.exports.command = function (firstName = "", lastName = "") {
  const contactsPage = this.page.ContactsPage();
  const manageContactPage = this.page.ManageContactPage();
  contactsPage
    .navigate(
      "https://jc251intg.infusiontest.com/Reports/searchTemplate.jsp?reportClass=AdvContactSearch&view=resultsPage"
    )
    .assert.title("Contacts")
    .waitForElementVisible("@newSearchButton")
    .click("@newSearchButton")
    .setValue("@firstNameInput", firstName)
    .setValue("@lastNameInput", lastName)
    .click("@searchButton")
    .pause(MEDIUM_TIMEOUT);

  this.element("link text", `${firstName} ${lastName}`, (contact) => {
    console.log('Hiiiiiiii');
    if (contact.status === 0) {
      contactsPage.clickContact(`${firstName} ${lastName}`);
      manageContactPage
        .waitForElementVisible("@deleteButton", MEDIUM_TIMEOUT)
        .click("@deleteButton")
        .api.acceptAlert()
        .pause(SHORT_TIMEOUT);

      //   contactsPage.expect.elements("@searchResultItems").count.to.equal(0);
      contactsPage.assert.containsText('@searchResultItems', '0', 'Contact Results Count element text matches with "0"');
    }
  });
  return this;
};
