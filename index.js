const fs = require('node:fs');
const axios = require('axios');
const path = require('node:path');
const { exit } = require('node:process');

const {sellCommand, stopCommand, msgCommand} = require("./commands.js");
const { Client, GatewayIntentBits, ActivityType, Collection, Events, SlashCommandBuilder,PermissionFlagsBits } = require("discord.js");
const discordbot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const checkOnline = require("./libs/checkOnline.js");
const checkStatus = require("./libs/checkStatus.js");
const deathCount = require("./libs/deathCount.js");
const doTrades = require("./libs/doTrades.js");
const ensureLocation = require("./libs/ensureLocation.js");
const runtimer = require("./libs/runtimer.js");
const sendMessage = require("./libs/sendMessage.js");
const startBank = require("./libs/startBank.js");
const updateDCActivity = require("./libs/updateDCActivity.js");
const visitPlayer = require("./libs/visitPlayer.js");

discordbot.commands = new Collection();

sellCommand.execute = async (interaction) => {
    selling = true;
    windowid = doTrades(mcbot, discordbot);
    await interaction.reply(`Selling the items.`);
}

msgCommand.execute = async (interaction) => {
    mcbot.chat(interaction.options.getString('message'));
    await interaction.reply(`Message Send!`);
}

stopCommand.execute = async (interaction) => {
    mcbot.end();
    await interaction.reply(`Bot Stopped!`);
    discordbot.logout();
    exit();
}

discordbot.commands.set('sell', sellCommand);
discordbot.commands.set('msg', msgCommand);
discordbot.commands.set('stop', stopCommand);

const mineflayer = require("mineflayer");
const mineflayerViewer = require("prismarine-viewer").mineflayer;
require("dotenv-safe").config();
console.time("timeElapsed");
let deaths = 0;
var purse;
var api = process.env.API_KEY;
var botid = "";
var selling = false;
var windowid;
var coins = 0;

var mcbot;

var startTime = Math.floor(new Date().getTime() / 1000);

discordbot.on("ready", () => {
  console.log(
    `Logged in as ${discordbot.user.username}#${discordbot.user.discriminator}`
  );
});

discordbot.on("error", (error) => {
  console.error('Discord bot error:', error);
});

discordbot.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

function makeMCBot() {

  mcbot = mineflayer.createBot({
    version: process.env.MINECRAFT_VERSION,
    username: process.env.MICROSOFT_EMAIL,
    auth: "microsoft",
    host: "hypixel.net",
    port: 25565,
    hideErrors: true,
  });

  mcbot.once("login", () => {
    console.log(`logged in as ${mcbot.username}`);
    discordbot.user.setActivity({
      name: "Hypixel",
      type: ActivityType.Playing,
      timestamps: { start: Date.now() },
      applicationId: 1308473311558369320,
    });
    discordbot.user.setStatus("online");
    updateDCActivity(mcbot, discordbot);
    runtimer(mcbot, discordbot);
  
    if (process.env.USE_PRISMARINE_VIEWER === "TRUE") {
      mineflayerViewer(mcbot, { port: process.env.PRISMARINE_VIEWER_PORT });
      
    } else console.log("Prismarine viewer disabled, skipping startup");
  //https://api.mojang.com/users/profiles/minecraft/
    axios.get('https://playerdb.co/api/player/minecraft/' + mcbot.username)
    .then(response => {
      botid = response.data.data.player.raw_id;
      checkStatus(mcbot, discordbot, selling);
      checkOnline(mcbot, discordbot, api, botid);
    })
    .catch(error => {
      console.error('Error fetching Mojang API:', error);
    });
    
    setTimeout(() => {
      //mcbot.chat("/api new");
      mcbot.setQuickBarSlot("0");
      setTimeout(() => {
        mcbot.chat("/locraw");
      }, 5000);
    }, 5000);
  });
  
  mcbot.on("messagestr", (message) => {
    if (message.startsWith('{"server":"')) {
      if (!selling) {
        selling = ensureLocation(mcbot, discordbot, message, selling);
      }
    } else if (
      !message.includes("❈ Defense") &&
      !message.includes("✎ Mana") &&
      !message.includes("⏣ Village") &&
      !message.startsWith("Autopet equipped") &&
      !message.includes("fell into the void.") &&
      !message.includes("Teleport Pad to the")
    ) {
      console.log(message);
    }
    if (message.includes("Your new API key is")) {
      api = message.split("Your new API key is ")[1].trim();
    } else if (
      message.startsWith("You died and your piggy bank cracked!") ||
      message.includes("coins and your piggy bank broke!")
    ) {
      mcbot.end();
      sendMessage(
        discordbot,
        "<@" +
          process.env.DISCORD_USER_ID +
          ">, Bot closed due to piggy bank break detected"
      );
      setTimeout(() => {
        process.exit();
      }, 3000);
    } else if (message.startsWith("Finding player...")) {
      visitPlayer(mcbot);
    } else if (
      message.startsWith("From ") ||
      message.startsWith("To ") ||
      message.startsWith("[SkyBlock]") ||
      message.startsWith("[✌]")
    ) {
      sendMessage(discordbot, message);
    } else if (message.includes("Limbo") || message.includes("/limbo")) {
      setTimeout(() => {
        mcbot.chat("/hub");
      }, 10000);
    } else if (message.includes("Evacuating to Hub")) {
      setTimeout(() => {
        if (!selling) {
          mcbot.chat("/is");
        }
      }, 10000);
    } else if (message.includes("Your inventory is full")) {
      sendMessage(
        discordbot,
        "<@" + process.env.DISCORD_USER_ID + ">, Full inventory detected"
      );
    } else if (
      message.includes(
        "You already have the maximum amount of Coins in your bank!"
      )
    ) {
      sendMessage(
        discordbot,
        "<@" + process.env.DISCORD_USER_ID + ">, Full bank detected"
      );
    } else if (message.includes("fell into the void.")) {
      if (deaths === 0) {
        deaths = deathCount(mcbot, discordbot, deaths);
        setTimeout(() => {
          mcbot.chat("/deathcount");
        }, 1000);
      } else {
        deaths++;
        console.log(deaths);
        discordbot.user.setActivity(`Deaths: ${deaths}`);
      }
    } else if (message.includes("You need the Cookie Buff to use this feature!") && selling){
      selling = false;
      console.log("No Booster Cookie");
    } else if (message.includes("sold") && message.includes("Coins")) {
      var add = message.split("for ")[1].split(" Coins")[0].replace(",", "");
      console.log(add);
      coins = coins + add;
    } else if (message.startsWith("[Bazaar]") && message.includes("coins")) {
      setTimeout(() => {
        mcbot.chat("/l");
        setTimeout(() => {
          mcbot.chat("/skyblock");
          setTimeout(() => {
            startBank(mcbot, discordbot);
          }, 3000);
        }, 3000);
      }, 3000);
      // sendMessage(discordbot, `Sold sulphur items for ${coins} coins`);
      // sendMessage(
      //   discordbot,
      //   `Sold slime items for ${
      //     message.split("Enchanted Slimeball for ")[1].split(" coins")[0]
      //   } coins`
      // );
    } else if (message.includes("Deposited") && message.includes("the account")) {
      selling = false;
      sendMessage(discordbot, message);
      setTimeout(() => {
        process.exit(1);
      }, 500);
    }
  });

  mcbot.on("kicked", (reason) => {
    console.log(reason);
    sendMessage(
      discordbot,
      "<@" + process.env.DISCORD_USER_ID + ">, Kicked for reason: " + reason
    );
    mcbot.end();
  });
  
  mcbot.on("error", (error) => {
    console.error('Minecraft bot error:', error);
    mcbot.end();
    sendMessage(discordbot, error);
  });

  mcbot.on('warn', (warning) => {
    console.warn('Warning:', warning);
  });
  
  mcbot.on('end', (reason) => {
    console.log('Bot ended:', reason);
    setTimeout(() => {
      makeMCBot();
    }, 5000);
  });

}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  console.error('Stack:', err.stack);
});

makeMCBot();
discordbot.login(process.env.DISCORD_BOT_TOKEN);
