const handleBank = require("./handleBank.js");

module.exports = function startBank(mcbot, discordbot) {
    console.log("starting");
    mcbot.setQuickBarSlot("1");
    mcbot.activateItem();
    handleBank(mcbot, discordbot);
  }