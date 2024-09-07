const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "achievement",
    usage: `${prefix}achievement <block>, <title>, <message>, [message2]`,
    description: `Returns a custom Minecraft achievement!`,
    emoji: "<:Minecraft:892957254121320468>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      try {
      let args1 = args.join(" ");
      let args2 = args1.split(", ");
      if (!args2[1] || !args2[2]) {
        const error = new Discord.MessageEmbed()
          .setTitle("Usage")
          .addField("\u200b", `\"achievement <block>, <title>, <message>, <message2>`)
          .setColor(process.env.EMBED_COLOR);
        message.channel.send({ embeds: [error] });
      }
      let title = args2[1].replace(/ /g, "..");
      let message2 = args2[2].replace(/ /g, "..");
      if (args2[3]) {
        let message3 = args2[3].replace(/ /g, "..");
        message.channel.send(
          `https://minecraft-api.com/api/achivements/${args2[0]}/${title}/${message2}/${message3}`
        );
        return;
      }
      message.channel.send(
        `https://minecraft-api.com/api/achivements/${args2[0]}/${title}/${message2}/`
      );
    } catch (e) {
    }
    }
}