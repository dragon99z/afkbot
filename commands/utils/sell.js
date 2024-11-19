const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('sell')
    .setDescription('Sells the items')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
};
