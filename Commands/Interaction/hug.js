const { MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
  name: "hug",
  description: "Hug the mentioned user",
  usage: `${prefix}hug <user>`,
  emoji: "🤗",

  run: async (client, message, args) => {
     try {
      let user;
      if (args[0]) {
        user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => {})
      } else {
        if (message.mentions.repliedUser) {
          user = await message.guild.members.fetch(message.mentions.repliedUser.id).catch(e => {
            return
          })
        } else {
          const errorembed = new MessageEmbed()
            .setColor("RED")
            .setTitle(`Error`)
            .setDescription(`You didn't provide any arguments.`)
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }
      }
      if (!user) {
        const { soyultro } = require("soyultro");
        let author = message.author.username;
        let embed = new MessageEmbed() //Preferible mandarlo en un Embed ya que la respuesta es un link
          .setTitle(`${author} hugged ${args.join(" ")}`)
          .setColor(process.env.EMBED_COLOR)
          .setImage(soyultro("hug"));
        return message.channel.send({embeds: [embed]});
      }
      if (user.id == message.author.id) {
        const errorembed = new MessageEmbed()
          .setColor("RED")
          .setTitle(client.language.ERROREMBED)
          .setDescription("You cannot hug yourself.")
          .setFooter(message.author.username, message.author.avatarURL());
        return message.channel.send({embeds: [errorembed]});
      }
      const { soyultro } = require("soyultro");
      let author = message.author.username;
      let embed = new MessageEmbed() 
        .setTitle(`${author} hugged ${user.user.username}`)
        .setColor(process.env.EMBED_COLOR)
        .setImage(soyultro("hug"));
      if (args.length > 1) {
        args.shift();
        const reason = args.join(" ");
        embed.addField("\u200b", reason);
      }
      message.channel.send({embeds: [embed]});
    } catch (e) {
      console.error(e);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(`Error`)
          .setDescription('An unexpected error happen')
          .setFooter(message.author.username, message.author.avatarURL())
        ]
      });
}
}
}