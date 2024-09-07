const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "lock",
    usage: `${prefix}lock`,
    description: `Locks the channel.`,
    emoji: "<:Block:892954888609349642>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
 try {
  
if (!message.member.permissions.has('ADMINISTRATOR'))
  return message.channel.send(`Sorry, but you don't have perms `);
      if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_GUILD")) {
        message.reply({ content: `I need permissions to **MANAGE_SERVER** and **MANAGE_CHANNELS** \`"MANAGE_GUILD"\``})
      }
      if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) {
        message.reply({ content: `I need permissions to **MANAGE_SERVER** and **MANAGE_CHANNELS** \`"MANAGE_MESSAGES"\``})
      } else {
        if (!message.deleted) message.delete().catch((e) => console.log(e));
      }
      message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });
      const embed = new Discord.MessageEmbed()
        .setTitle("Channel Updates")
        .setDescription(
          `<:Block:892954888609349642> ${message.channel} has been locked`
        )
        .setColor(process.env.EMBED_COLOR);
      await message.channel.send({embeds: [embed]});
    } catch (e) {
      console.error(e);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle('Error')
          .setDescription("An unexpected error happen")
          .setFooter(message.author.username, message.author.avatarURL())
        ]
      });
    }
    }
}