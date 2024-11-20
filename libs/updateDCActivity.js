const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
var startTime = Date.now();

module.exports = function updateDCActivity(mcbot, discordbot) {
    setInterval(() => {
        let timeElapsed = (Date.now() - startTime) / 1000;

        let hours = Math.floor(timeElapsed / 3600);
        if (hours < 10) {
            hours = "0" + hours;
        }

        let minutes = Math.floor(timeElapsed / 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let seconds = Math.floor(timeElapsed % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

          discordbot.user.setPresence({
            activities: [{ name: "Hypixel since " + hours + " : " + minutes + " : " + seconds, type: ActivityType.Playing, timestamps: { start: Date.now() }, applicationId: 1308473311558369320 }],
            status: 'online',
          });
      }, 1000*4);
}