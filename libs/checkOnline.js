const sendMessage = require("./sendMessage.js")

module.exports = function checkOnline(mcbot, discordbot,api,botid) {
    setInterval(() => {
      /*axios.get(`https://api.hypixel.net/status?key=${api}&uuid=${botid}`)
          .then((response) => {
            // console.log(json);
            if (!response.data.session.online) {
              discordbot.user.setActivity({
                name: "offline",
                type: ActivityType.Playing,
              });
              discordbot.user.setStatus("idle");
              mcbot = mineflayer.createBot({
                version: "1.8.9",
                username: process.env.MICROSOFT_EMAIL,
                auth: "microsoft",
                host: "hypixel.net",
                port: 25565,
              });
            }
          }).catch(error => {
            console.error('Error fetching hypixel API:', error);
          });*/

          if (mcbot.state === 'disconnected') {
            sendMessage(discordbot, "The bot got disconnected, restarting...");
            discordbot.user.setActivity({
              name: "offline",
              type: ActivityType.Playing,
            });
            discordbot.user.setStatus("idle");
            mcbot = mineflayer.createBot({
              version: process.env.MINECRAFT_VERSION,
              username: process.env.MICROSOFT_EMAIL,
              auth: "microsoft",
              host: "hypixel.net",
              port: 25565,
            });
          }
      console.timeLog("timeElapsed");
    }, 1000*30);
  }

