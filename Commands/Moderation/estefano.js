const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "giken",
    usage: `${prefix}giken`,
    description: `sayonara`,
    emoji: "👍",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      try {
        
       message.channel.send("lamentablemente esta mierda crasheo 29278262 veces asi que lo elimine, me lo maman")

      } catch (e) {
        message.channel.send('Mala mia mano, se crasheo esta mierda')
      }
    }
}
