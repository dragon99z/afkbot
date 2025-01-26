const sendMessage = require("./sendMessage.js");

module.exports = function checkStatus(mcbot, discordbot,selling) {
    setInterval(() => {
      try{
        if (
          JSON.stringify(mcbot.scoreboard.sidebar.items).includes(
            'text":"Your Isla'
          )
        ) {
          console.log("\x1b[32m%s\x1b[0m", "Already on island");
        } else {
          mcbot.chat("/locraw");
          if (!selling) {
            sendMessage(discordbot, "Not on private island- relocating");
            console.log("\x1b[32m%s\x1b[0m", "Not on private island- relocating");
          } else if (selling) {
            sendMessage(
              discordbot,
              "Not on private island- currently selling items"
            );
            console.log(
              "\x1b[32m%s\x1b[0m",
              "Not on private island- currently selling items"
            );
          }
        }
      }catch (TypeError){
        mcbot.chat("/locraw");
        sendMessage(discordbot, "Bot in Limbo - relocating");
      }
    }, 10000);
  }