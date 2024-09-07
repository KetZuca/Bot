const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "lands",
    usage: `${prefix}`,
    description: ``,
    emoji: "",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      message.channel.send("light:\n 10, 6\n16, 10\n13, 5\n\nNight\n12, 11\n8, 13\n2, 20\n\nWorld\n8, 8\n13, 14")

    }
}