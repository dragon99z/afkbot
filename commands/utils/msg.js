const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('msg')
		.setDescription('Send Message')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to be send')
                .setRequired(true))
};
