const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const color = process.env.EMBED_COLOR


module.exports = {
    name: "say",
    usage: `${prefix}`,
    description: `Says the message you type!`,
    emoji: "<:PowerWave:892239517824725002>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      message.delete()
      if(!args.join(" ")) return message.channel.send({ embeds: [
        new MessageEmbed()
        .setColor("RED")
        .setDescription('You need to put a text')
      ]})

       message.channel.send({ embeds: [
          new Discord.MessageEmbed()
            .setColor(color)
            .setDescription(args.join(" "))
            .setTimestamp(" ")
        ]});

    }
}