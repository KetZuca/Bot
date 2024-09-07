const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "bite",
    usage: `${prefix}bite <user>`,
    description: `Bites the mentioned user`,
    emoji: "<:Bite:892561077454377011>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {

 
try {
			let user
			if (args[0]) {
				user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(e => {
					return
				})
			} else {
				if (message.mentions.repliedUser) {
					user = await message.guild.members.fetch(message.mentions.repliedUser.id).catch(e => {
						return
					})
				} else {
					const errorembed = new Discord.MessageEmbed()
						.setColor("RED")
						.setTitle(`Error`)
						.setDescription(`You didn't provide any arguments.`)
						.setFooter(message.author.username, message.author.avatarURL());
					return message.channel.send({embeds: [errorembed]}).catch(e => {});
				}
			}
			if (!user) {
				const { soyultro } = require("soyultro");
				let author = message.author.username;
				let embed = new Discord.MessageEmbed() //Preferible mandarlo en un Embed ya que la respuesta es un link
					.setTitle(`${author} bit ${args.join(" ")}`)
					.setColor(process.env.EMBED_COLOR)
					.setImage(soyultro("bite"));
				return message.channel.send({embeds: [embed]}).catch(e => {});
			}
			if (user.id == message.author.id) {
				const errorembed = new Discord.MessageEmbed()
					.setColor("RED")
					.setTitle(`Error`)
					.setDescription(`You cannot bite yourself.`)
					.setFooter(message.author.username, message.author.avatarURL());
				return message.channel.send({embeds: [errorembed]}).catch(e => {});
			}
			const { soyultro } = require("soyultro");
			let author = message.author.username;
			let embed = new Discord.MessageEmbed()
				.setTitle(`${author} bit ${user.user.username}`)
				.setColor(process.env.EMBED_COLOR)
				.setImage(soyultro("bite"));

			message.channel.send({embeds: [embed]}).catch(e => {});
		} catch (e) {
			console.error(e);
			message.channel.send({ embeds: [
				new Discord.MessageEmbed()
					.setColor("RED")
					.setTitle(`Error`)
					.setDescription(`An unexpected error happen`)
					.setFooter(message.author.username, message.author.avatarURL())
			]});

         }
    }
}
