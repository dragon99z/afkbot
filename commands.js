const { SlashCommandBuilder,PermissionFlagsBits  } = require("discord.js");

const sellCommand = new SlashCommandBuilder()
  .setName('sell')
  .setDescription('Sells the items')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setDMPermission(false);

const stopCommand = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Stop the Bot')
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  .setDMPermission(false);

const msgCommand = new SlashCommandBuilder()
		.setName('msg')
		.setDescription('Send Message')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false)
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to be send')
                .setRequired(true));

module.exports = { sellCommand, stopCommand, msgCommand };