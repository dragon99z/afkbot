const doTrades = require("./doTrades.js")

function runAtMidnight(mcbot, discordbot) {
    // Get the current date/time in the user's timezone
    const now = new Date();
  
    // Get the current date/time in Eastern Standard Time (EST)
    const estTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
  
    // Check if it's currently midnight EST
    if (estTime.getHours() === 0 && estTime.getMinutes() === 0) {
      // Call your function here
      doTrades(mcbot, discordbot);
    }
  }
  
  // Call the function every minute to check if it's midnight EST
module.exports = function runtimer(mcbot, discordbot) {
    setInterval(() => {
      runAtMidnight(mcbot, discordbot);
    }, 60 * 1000);
  }