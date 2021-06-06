module.exports = {
  elements: {
    topNavMenu: '.supernav-hamburger-icon',
    
  },

  commands: [
    {
      clickNavItem(value) {
        const navItemSelector = {
          selector: `//span[text()="${value}"]`,
          locateStrategy: "xpath",
        };

        return this.click(navItemSelector);
      },

     
      
    },
  ],
};
