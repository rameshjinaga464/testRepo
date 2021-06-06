module.exports = {
  //  url() {​​​​​​​
  //     return 'https://jc251intg.infusiontest.com/Reports/searchTemplate.jsp?reportClass=AdvContactSearch&view=resultsPage';
  // }​​​​​​​,

  elements: {
    newSearchButton: {
      selector: '//a[text()="New Search"]',
      locateStrategy: "xpath",
    },
    addNoteButton: {
      selector: '//input[@value="Add Note"]',
      locateStrategy: "xpath",
    },
    //New Search contact filters
    firstNameInput: "input#FirstName_DATA",
    lastNameInput: "input#LastName_DATA",
    companyInput: "input#Company_DATA",
    searchButton: "input#submitSearchFilters",
    chunkDataLink: ".chunk-data-link",
    deleteButton: "#Delete",
    //MainSearchBox
    mainSearchDataInput: "#mainSearchData",
    clickOnmainSearchDataInput: ".search-result-email",
    searchresultContactLink: ".chunk-data-link",
    //AppointmentButton
    addAppointmentButton: "#Add_Appointment",
    companyInput: "#Contact0Company",
    //TaskButton
    addTaskButton: "#Add_Task",
    openTaskLink: ".incompleteEventLink",
    openNoteLink:
      "#tab_data_tasks > table > tbody > tr:nth-child(8) > td > table > tbody > tr.noteRow > td.noteColumn > p.noteSubjectText > a",
    //Manage tag Pages
    tagTab: "#tab_link_ngroups",
    createATag: "#newTag",

    //Contact Tag Pages
    openTagSection: "#tab_link_ngroups",
    createNewTagButton: "#newTag",
    tagNameInput: "#ContactGroupDb0GroupName",

    createApplyTagButton: "#NewTagButton",
    verifyTagName: ".groupName[title]",
    removeTagButton: ".tagRemoveData",

    searchResultItems: ".grid-cont-num-results-num",
  },

  // commands:
  //   [
  //   {
  //       clickContact(fullName) {
  //           const contactSelector = {​​​​​​​​
  //             selector:`(//*[normalize-space(text())="${fullName}​​​​​​​​"]//ancestor::a)[last()]`,
  //             locateStrategy:'xpath',
  //           };
  //           return this.click(contactSelector);
  //       },
  //   },
  // ],
  commands: [
    {
      // clickContact(fullName) {
      //   const contactSelector = {
      //     selector: `(//*[normalize-space(text())="${fullName}​​​​​​​​"]//ancestor::a)[last()]`,
      //     locateStrategy: "xpath",
      //   };

      //   //return this.moveToElement(contactSelector).waitForElementVisible(contactSelector).click(contactSelector);
      //   return this//.waitForElementVisible(contactSelector)
      //    // .pause(5000)
      //     .moveToElement(contactSelector, null, null, () =>
      //       this.click(contactSelector)
      //     );
      // },

      clickContact(name) {
        const nameLinkSelector = {
          selector: name,
          locateStrategy: "link text",
        };

        return this.click(nameLinkSelector);
      },
    },
  ],
};
