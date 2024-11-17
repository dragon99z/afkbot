const { REST, Routes } = require('discord.js');
require("dotenv-safe").config();

clientId = process.env.DISCORD_CLIENT_ID;
guildId = process.env.DISCORD_SERVER_ID;
token = process.env.DISCORD_BOT_TOKEN;

const rest = new REST().setToken(token);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);
