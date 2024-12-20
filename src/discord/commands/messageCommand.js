

module.exports = {
  name: "message",
  description: "Sends a message as the Discord Bot.",
  moderatorOnly: true,
  requiresBot: false,
  options: [
    {
      name: "message",
      description: "What the bot will send.",
      type: 3,
      required: true,
    },
    {
        name: "channel",
        description: "Where the bot will send the message.",
        type: 3,
        required: true,
      },
  ],

  execute: async (interaction) => {
    const message = interaction.options.getString("message");
    var channel = interaction.options.getString("channel")
    channel = channel.replace("<#", "").replace(">", "")
    const messageToUser = `Successfully sent the message.`

    await interaction.followUp({ content: messageToUser, ephemeral: true});
    await client.channels.cache.get(channel).send(message)
  },
};
