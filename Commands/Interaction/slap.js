const { MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const clientN = require("nekos.life");
const neko = new clientN()

module.exports = {
  name: "slap",
  description: "Slap the mentioned user",
  usage: `${prefix}slap <user>`,
  emoji: "🖐",

  run: async (client, message, args) => {
    let mention = message.mentions.members.first()
if(!mention) return message.channel.send("You need to mention a user")
  neko.sfw.slap().then(neko => {
const embed = new MessageEmbed()
.setColor(process.env.EMBED_COLOR)
.setTitle(`${message.member.displayName} slapped ${mention.displayName}`)
.setImage(neko.url)
message.channel.send({embeds: [embed]})
 })
}
}