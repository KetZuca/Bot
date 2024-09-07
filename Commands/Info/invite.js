const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "invite",
    usage: `${prefix}invite`,
    description: `Give the invite link for Power Bot.`,
    emoji: "<:corazonzitos:894093965626863626>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
 try {
      let embed = new Discord.MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setDescription("[Click here](https://discord.com/oauth2/authorize?client_id=881998636186210384&permissions=8&scope=bot%20applications.commands) to invite Power to your server <:corazonzitos:894093965626863626>");
      return message.channel.send({embeds: [embed]});
    } catch (e) {
      console.error(e);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("Error")
          .setDescription("An unexpected error happen")
          .setFooter(message.author.username, message.author.avatarURL())
        ]
      });
    }
    }
}