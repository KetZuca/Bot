const client = require('nekos.life');
const neko = new client();
const prefix = require("../../config.json").prefix;
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "owo",
  description: "Owoify the text",
  usage: `${prefix}owo <text>`,
  emoji: "🐶",

  run: async (client, message, args) => {
  let textowo = args.join(' ')
  if (!textowo) return message.channel.send('You need to put a text.')

 neko.sfw.OwOify({text: `${textowo}`}).then(neko => {
   

  const owoEmbed = new MessageEmbed()
  .setTitle('Owoified text')
  .setDescription(`${neko.owo}`)
  .setColor(process.env.EMBED_COLOR)
  .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true,
          })
        )
        message.channel.send({embeds: [owoEmbed]})
         })
  }
} 