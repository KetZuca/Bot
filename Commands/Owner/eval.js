const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const {
  inspect
} = require("util");

module.exports = {
  name: "eval",
  description: "Evaluate code",
  usage: `${prefix}eval <code>`,
  emoji: "💻",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "852617123451633705")
      if (message.author.id !== "498342521810714624") return;
     try {
      let evaled;
      try {
        evaled = await eval(args.join(" "));
        const embed = new Discord.MessageEmbed()
          .setAuthor("Eval | Power")
          .setColor(process.env.EMBED_COLOR)
          .addField(":inbox_tray: Entrada", `\`\`\`js\n${args.join(" ")}\`\`\``)
          .addField(
            ":outbox_tray: Salida",
            `\`\`\`js\n${inspect(evaled)}\n\`\`\``
          )
          .setTimestamp(" ");

        message.channel.send({embeds: [embed]}).catch(e => {})
        
      } catch (error) {
        console.error(error);
        message.reply({ content: `there was an error during evaluation. ${error.toString()}`});
      }
    } catch (e) {
      console.error(e);
      message.channel.send(
        new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(`Error`)
        .setDescription(`Idk what happen you dumb coder lmao`)
        .setFooter(message.author.username, message.author.avatarURL())
      );
  }
}
}