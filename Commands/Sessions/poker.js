const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const fetch = require("node-fetch");


module.exports = {
    name: "poker",
    usage: `${prefix}poker`,
    description: `Starts a poker session together.`,
    emoji: "<:poker:893311194117578752>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      try {
			const { DiscordTogether } = require('discord-together');

			client.discordTogether = new DiscordTogether(client);
			const Guild = await client.guilds.fetch(message.guild.id); // Getting the guild.
			await Guild.members.fetch(message.member.id).then(async Member => {
				const channel = await Member.voice.channel;
				if (!Guild) return;
				if (!Member) return;
				if (!channel) {
					const errorembed = new Discord.MessageEmbed()
						.setColor("RED")
						.setTitle('Error')
						.setDescription("You must be on a voice channel to execute this command.")
						.setFooter(message.author.username, message.author.avatarURL());
					return message.channel.send({ embeds: [errorembed] });
				}
				if (args[0]) {
					if (args[0].toLowerCase() == "--unlimited") {
						client.discordTogether.createTogetherCode(channel.id, 'poker', 0).then(async invite => {
							if (invite.code === 50013) {
								const errorembed = new Discord.MessageEmbed()
									.setColor("RED")
									.setTitle("Error")
									.setDescription("Hey The bot needs the permissions of `CREATE_INSTANT_INVITE` to continue, in case of not having them this command won't work")
									.setFooter(
										message.author.username,
										message.author.avatarURL()
									);
								return message.channel.send({ embeds: [errorembed] });
							}
							const embed = new Discord.MessageEmbed();
							if (!invite.code) {
								const errorembed = new Discord.MessageEmbed()
									.setColor("RED")
									.setTitle("Error")
									.setDescription("You must be on a voice channel to execute this command.")
									.setFooter(
										message.author.username,
										message.author.avatarURL()
                  )
								return message.channel.send({ embeds: [errorembed] });
							}
							embed.setColor(process.env.EMBED_COLOR);
							embed.setDescription(
								`<:arrow:893307266399342652> [Click here](${invite.code} 'Enlace de Youtube')`
							);
							return message.channel.send({ embeds: [embed] });
						}).catch(e => {
							if (e == 'Your bot lacks permissions to perform that action') {
								const errorembed = new Discord.MessageEmbed()
									.setColor("RED")
									.setTitle("Error")
									.setDescription(
										"I don't have enough permissions."
									)
									.setFooter(message.author.username, message.author.avatarURL());
								return message.channel.send({ embeds: [errorembed] });
							}
						})
					} else {
						const errorembed = new Discord.MessageEmbed()
							.setColor("RED")
							.setTitle("Error")
							.setDescription(
								`The only valid option is --unlimited. Check its use using ${prefix}help youtube.`
							)
							.setFooter(message.author.username, message.author.avatarURL());
						return message.channel.send({ embeds: [errorembed] });
					}
					return;
				}
				client.discordTogether.createTogetherCode(channel.id, 'poker', 900).then(async invite => {
					if (invite.code === 50013) {
						const errorembed = new Discord.MessageEmbed()
							.setColor("RED")
							.setTitle("Error")
							.setDescription("Hey The bot needs the permissions of `CREATE_INSTANT_INVITE` to continue, in case of not having them this command won't work")
							.setFooter(
								message.author.username,
								message.author.avatarURL()
							);
						return message.channel.send({ embeds: [errorembed] });
					}
					const embed = new Discord.MessageEmbed();
					if (!invite.code) {
						const errorembed = new Discord.MessageEmbed()
							.setColor("RED")
							.setTitle("Error")
							.setDescription("You must be on a voice channel to execute this command.")
							.setFooter(
								message.author.username,
								message.author.avatarURL()
							);
						return message.channel.send({ embeds: [errorembed] });
					}
					embed.setColor(process.env.EMBED_COLOR);
					embed.setDescription(
						`<:arrow:893307266399342652> [Click here](${invite.code} 'Enlace de Youtube')`
					);
					return message.channel.send({ embeds: [embed] });
				}).catch(e => {
					if (e == 'Your bot lacks permissions to perform that action') {
						const errorembed = new Discord.MessageEmbed()
							.setColor("RED")
							.setTitle("Error")
							.setDescription(
								"I don't have enough permissions."
							)
							.setFooter(message.author.username, message.author.avatarURL());
						return message.channel.send({ embeds: [errorembed] });
					}
				})
			})
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