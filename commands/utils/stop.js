const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('stop')
	.setDescription('Stop the Bot')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
};
