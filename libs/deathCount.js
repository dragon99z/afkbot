module.exports = function deathCount(mcbot, discordbot, deaths) {
    const deathregex = /^[a-zA-Z]+:\s*\d+$/;
    mcbot.on("messagestr", (message) => {
      if (deathregex.test(message) && message.includes(`${mcbot.username}:`)) {
        deaths = message.split(`${mcbot.username}: `)[1].trim();
      }
    });
    return deaths;
  }