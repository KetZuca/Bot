const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const r34 = new (require('r34api.js'))



module.exports = {
    name: "r34",
    usage: `${prefix}r34 [name]`,
    description: `Needs explication?`,
    emoji: "<:onichan:936022966507032596>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      if(!args.join(" ")) return message.channel.send('Escribe los tags a buscar, tont0')
      r34.search(args.join(" ")).then(json => { 
const embed = new MessageEmbed()
.setColor("RANDOM")
.setImage(json.data.media) 
console.log(json.data.media)

}).catch((err) => message.channel.send("Er diablo loco, el porno ha crasheado, mala mia mano" + err))
    }
}