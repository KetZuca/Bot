const { Client, Message, MessageEmbed } = require("discord.js");
const translate = require("@iamtraction/google-translate");
const prefix = require("../../config.json").prefix;


module.exports = {
  name: "translate",
  description: "Translate given text ",
  usage: `${prefix}translate <idiom> + <text>`,
  emoji: "🔄",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {

    args = args.join(" ").split(" + ")
    if(!args[0]) return message.channel.send("You need to put a language to translate\nHere is a list of some languages http://www.mathguide.de/info/tools/languagecode.html (Some of them maybe not work)")

    if(!args[1]) return message.channel.send("You need a text to translate")


       
    const translated = await translate(args[1], { to: args[0] });
    const embed = new MessageEmbed()
      .setFooter(`${message.author.tag}`)
      .addField("Text To Translate", `\`\`\`${args[1]}\`\`\``)
      .addField("Translated Text", `\`\`\`${translated.text}\`\`\``)
      .setColor(process.env.EMBED_COLOR);
    message.channel.send({ embeds: [embed] });
    } catch (e) {
      message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription(`${e}`)
            .setFooter(message.author.username, message.author.avatarURL())
        ]
      });
    }
  },
};