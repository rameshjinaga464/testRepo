module.exports.command = function () {
  const loginPage = this.page.LoginPages();
  loginPage
    .navigate(this.globals.launchURL)
    .maximizeWindow()
    .setValue("@username",this.globals.userId)
    .setValue("@password", this.globals.password)
    .click("@loginButton")
    .assert.title("Dashboard");

  return this;
};
