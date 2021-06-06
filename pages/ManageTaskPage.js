module.exports = {
  elements: {
    actionDescription: '#Task0ActionDescription',
    actionDate: '#Task0ActionDate_date',
    completionDate: '#Task0CompletionDate_date',
    creationNotes: '#Task0CreationNotes',
    saveButton: '#Save',
    userSelect: '#Task0UserID',
    saveAndNewButton: '#SaveAndNew',
    completeTask: 'input#completeTask',
    taskDeleteButton: {
      selector: `//input[@name='Delete']`,
      locateStrategy: 'xpath',
    },
  },
};
