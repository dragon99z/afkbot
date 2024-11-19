module.exports = function sendMessage(discordbot, message) {
    if (message.toString().trim() === '') {
      console.log('Skipping empty message');
      return;
    }
    if((typeof message === "string" && message.length === 0) || message === null)
      return;
  
    const channel = discordbot.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    if (!channel) {
      console.error('Error: DISCORD_CHANNEL_ID is not set or is invalid');
      return;
    }
  
    channel.send(message).catch(error => {
      console.error('Error sending message:', error);
    });
  }