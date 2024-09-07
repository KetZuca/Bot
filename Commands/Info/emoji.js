const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "emoji",
    usage: `${prefix}emoji <name> + image attached`,
    description: `Creates a new emoji.`,
    emoji: "<:isee:892960871175839755>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      try {
			if (!args[0]) {
				const errorembed = new Discord.MessageEmbed()
					.setColor("RED")
					.setTitle("Error")
					.setDescription(
						`You forgot to add the emote's name: \`${prefix}emoji <name> + image attached\`. ^^`
					)
					.setFooter(message.author.username, message.author.avatarURL());
				return message.channel.send({ embeds: [errorembed] });
			}
			if (message.attachments.size == 0) {
				const errorembed = new Discord.MessageEmbed()
					.setColor("RED")
					.setTitle("Error")
					.setDescription("You must add one image to convert it to emote.")
					.setFooter(message.author.username, message.author.avatarURL());
				return message.channel.send({ embeds: [errorembed] });
			}
			Array.from(message.attachments, ([key, value]) => {
				let attachment = value.attachment;
				if (!attachment) {
					const errorembed = new Discord.MessageEmbed()
						.setColor("RED")
						.setTitle("Error")
						.setDescription("You must add one image to convert it to emote.")
						.setFooter(message.author.username, message.author.avatarURL());
					return message.channel.send({ embeds: [errorembed] });
				}
				try {
					message.guild.emojis
						.create(attachment, args[0], {})
						.then((e) => {
							const emoji = client.emojis.cache.get(e.id);
							const embed = new Discord.MessageEmbed()
								.setColor(process.env.EMBED_COLOR)
								.setTitle("Success")
								.setDescription(
									`A new emote has been added ${emoji}. Type \`:${args[0]}:\` to use it!`
								)
								.setFooter(message.author.username, message.author.avatarURL());
							return message.channel.send({ embeds: [embed] });
						})
						.catch((e) => {
							const errorembed = new Discord.MessageEmbed()
								.setColor("RED")
								.setTitle("Error")
								.setDescription("The emoji size cannot exceed 256kb")
								.setFooter(message.author.username, message.author.avatarURL());
							return message.channel.send({ embeds: [errorembed] });
						});
				} catch (e) {
					const errorembed = new Discord.MessageEmbed()
						.setColor("RED")
						.setTitle("Error")
						.setDescription("You've reached the maximum number of emotes available.")
						.setFooter(message.author.username, message.author.avatarURL());
					return message.channel.send({ embeds: [errorembed] });
				}
			})
		} catch (e) {
			console.error(e);
			message.channel.send({
				embeds: [
					new Discord.MessageEmbed()
						.setColor("RED")
						.setTitle("Error")
						.setDescription("An unexpected error ocurred")
						.setFooter(message.author.username, message.author.avatarURL())
				]
			});
    }
    }
}