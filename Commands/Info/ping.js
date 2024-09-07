const { MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
  name: "ping",
  category: "info",
  description: "Get bot's real time ping status",
  usage: `${prefix}ping`,
  emoji: "🏓",

  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setTitle("🏓 Ping pong!")
      .setDescription(`PING: ${client.ws.ping}`);

    message.channel.send({ embeds: [embed] });
  },
};