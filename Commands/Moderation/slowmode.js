const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "slowmode",
    usage: `${prefix}slowmode <duration>`,
    description: `Sets the slowmode on the channel.`,
    emoji: "<:Alert:892958333026332753>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
try {
      if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) {
        message.reply({ content: `I don't have the permission \`"MANAGE_MESSAGES"\``})
      } else {
        if (!message.deleted) message.delete().catch((e) => console.log(e));
      }
      if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Sorry, but you dont have perms to set slowmode')
      if (isNaN(args[0]) || parseInt(args[0]) < 0) {
        const errorembed = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("Error")
          .setDescription("Please provide the duration to setup the slowmode for this channel.")
          .setFooter(message.author.username, message.author.avatarURL());
        return message.channel.send({embeds: [errorembed]});
      }

      if (parseInt(args[0]) > 21600) {
        const errorembed = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("Error")
          .setDescription("I can only setup upto 21600 seconds maximum, which is 6 hours.")
          .setFooter(message.author.username, message.author.avatarURL());
        return message.channel.send({embeds: [errorembed]});
      }

      const duration = args[0];

      message.channel.setRateLimitPerUser(duration);

      const embed = new Discord.MessageEmbed()
        .setTitle("SlowMode")
        .setColor(process.env.EMBED_COLOR)
        .setDescription(
          `<:Alert:892958333026332753> Slowmode has been setup to **\`${duration}\`** seconds\n\nIf you want to turn slowmode off type **\`${prefix}slowmode 0\`**`
        )
        .addField("Channel", `<#${message.channel.id}>`, true)
        .addField("Setup by", `<@${message.author.id}>`, true)
        .setTimestamp(" ")
        .setFooter(
          `Setup by ${message.member.displayName}`,
          message.author.displayAvatarURL({
            dynamic: true,
          })
        );

      message.channel.send({embeds: [embed]});
    } catch (e) {
      console.error(e);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("Error")
          .setDescription("An unexpected error happen")
          .setFooter(message.author.username, message.author.avatarURL())
        ]
      });
    }
    }
}