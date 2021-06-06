module.exports.command = async function (value, option) {
  const optionSelector = {
    selector: `//select[contains(@id,"${value}")]/option[contains(text(), "${option}")]`,
    locateStrategy: "xpath",
  };
  return this.click(optionSelector);
};
