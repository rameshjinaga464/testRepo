// eslint-disable-next-line func-names
module.exports.command = function (firstName = "", lastName = "", email = "") {
  const contactsPage = this.page.ContactsPage();
  const addAContactPage = this.page.AddAContactPage();

  contactsPage.navigate('https://jc251intg.infusiontest.com/Reports/searchTemplate.jsp?reportClass=AdvContactSearch&view=resultsPage').assert.title("Contacts");
  addAContactPage
    .click("@addAContactButton")
    .waitForElementVisible("@firstNameInput")
    .setValue("@firstNameInput", firstName)
    .setValue("@lastNameInput", lastName)
    .setValue("@emailInput", email)
    .click("@saveButton")
    .assert.title(firstName + " " + lastName);

  return this;

  // manageContactPage.assert.visible(topNav, 'Top Nav section visible.');
  // topNav.assert.visible(quickAdd, 'Quick Add section visible.');

  // quickAdd.click('@quickAddButton')
  //     .assert.visible(quickAddForm, 'Quick Add Form section visible.');

  // quickAddForm
  //     .clearAndSetValue('@firstNameInput', firstName)
  //     .clearAndSetValue('@lastNameInput', lastName)
  //     .clearAndSetValue('@emailInput', email);

  // if (marketingConsent) {
  //     quickAddForm.click('@marketingPermissionCheckbox');
  // }

  // quickAddForm
  //     .clearAndSetValue('@phoneInput', phoneNumber)
  //     .clearAndSetValue('@extensionInput', extension)
  //     .click('@saveButton');

  // quickAdd.assert.visible(successForm, 'Success Forms section visible.');

  // successForm.click('@newContactLink');

  // manageContactPage.assert.visible(generalTab, 'General Tab section visible.');

  // generalTab
  //     .assert.value('@firstNameInput', firstName)
  //     .assert.value('@lastNameInput', lastName)
  //     .assert.value('@emailInput', email);
};
