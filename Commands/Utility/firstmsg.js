const { Client, Message, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
  name: "firstmsg",
  description: "Gives you first message of channel!",
  usage: `${prefix}firstmsg`,
  emoji: "💬",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const fetchMessages = await message.channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    const embed = new MessageEmbed()

      .setTitle(`First Messsage in ${message.guild.name}`)
      .setURL(msg.url)
      .setColor(process.env.EMBED_COLOR)
      .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
      .setDescription("Content: " + `${msg.content}`)
      .addField("Author", `${msg.author}`, true)
      .addField("Message ID", `${msg.id}`, true)
      .addField(
        "Created At",
        `${message.createdAt.toLocaleDateString()}`,
        true
      );
    message.channel.send({ embeds: [embed] });
  },
};