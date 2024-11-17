const { REST, Routes,SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
require("dotenv-safe").config();
const fs = require('node:fs');
const path = require('node:path');

clientId = process.env.DISCORD_CLIENT_ID;
guildId = process.env.DISCORD_SERVER_ID;
token = process.env.DISCORD_BOT_TOKEN;

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

sellCommand = new SlashCommandBuilder()
		.setName('sell')
		.setDescription('Sells the items')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false);
sellCommand.execute = async (interaction) => {
    selling = true;
    doTrades(mcbot, discordbot);
    await interaction.reply(`Selling the items.`);
}

msgCommand = new SlashCommandBuilder()
		.setName('msg')
		.setDescription('Send Message')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to be send')
                .setRequired(true));
msgCommand.execute = async (interaction) => {
    mcbot.chat(interaction.options.getString('message'));
    await interaction.reply(`Message Send!`);
}

stopCommand = new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop the Bot')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false);
stopCommand.execute = async (interaction) => {
    mcbot.end();
    await interaction.reply(`Bot Stopped!`);
    discordbot.logout();
    exit();
}

commands.push(sellCommand.toJSON());
commands.push(msgCommand.toJSON());
commands.push(stopCommand.toJSON());

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
