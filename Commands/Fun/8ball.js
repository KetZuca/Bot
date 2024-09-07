const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "ask",
    usage: `${prefix}ask <question>`,
    description: `Ask your question to 8ball.`,
    emoji: ":8ball:",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
       try {
      let respuesta =  [
      "Yes",
      "No",
      "Maybe",
      "Obviously",
      "As I see it, yes",
      "My sources say no",
      "Most likely"
    ]
      let argumentos = args.join(" ");
      var random = respuesta[Math.floor(Math.random() * respuesta.length)]; 
      const embed = new Discord.MessageEmbed() 
        .addField("To your question", `${args.join(" ")}`) 
        .addField("My answer is", `${random}`) 
        .setColor(process.env.EMBED_COLOR); 
      message.channel.send({ embeds: [embed] }); 
    } catch (e) {
      console.error(e);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription('An unexpected error happen')
            .setFooter(message.author.username, message.author.avatarURL())
        ]
      });
    }
    }
}