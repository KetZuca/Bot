const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const prefix = require("../../config.json").prefix;
let CodeModel = require('../../models/code.js')
const Discord = require("discord.js")
const flags = {
	DISCORD_EMPLOYEE: "Discord Employee",
	PARTNERED_SERVER_OWNER: "Discord Partner",
	BUGHUNTER_LEVEL_1: "Bug Hunter (Level 1)",
	BUGHUNTER_LEVEL_2: "Bug Hunter (Level 2)",
	HYPESQUAD_EVENTS: "HypeSquad Events",
	HOUSE_BRAVERY: "House of Bravery",
	HOUSE_BRILLIANCE: "House of Brilliance",
	HOUSE_BALANCE: "House of Balance",
	EARLY_SUPPORTER: "Early Supporter",
	TEAM_USER: "Team User",
	SYSTEM: "System",
	VERIFIED_BOT: "Verified Bot",
	EARLY_VERIFIED_BOT_DEVELOPER: "Verified Bot Developer",
	DISCORD_CERTIFIED_MODERATOR: "Discord Certified Moderator"
};

module.exports = {
  name: "userinfo",
  usage: `${prefix}userinfo [user/user id]`,
  emoji: "💁‍♂️",
  description: "Get advance stats of given person or yourself",
  run: async (client, message, args) => {
   try {
			let embed2 = new Discord.MessageEmbed()
				.setColor(process.env.EMBED_COLOR)
				.setDescription('Getting the profile...')
				.setFooter(message.author.username, message.author.avatarURL());
			const sentMessage = await message.channel.send({ content: " ", embeds: [embed2] })
			let member
			if (args[0]) {
				member = message.mentions.members.last() || await message.guild.members.fetch(args[0]).catch(e => {
					return
				})
			} else {
				member = message.member
			}
			if (!member || !member.user) {
				const errorembed = new Discord.MessageEmbed()
					.setColor("RED")
					.setTitle("Error")
					.setDescription("I couldn't find the member.")
					.setFooter(message.author.username, message.author.avatarURL());
				return sentMessage.edit({ embeds: [errorembed] });
			}
			let emblemas = member.user.ROLES;
			let badges = [];
			const roles = member.roles.cache
				.sort((a, b) => b.position - a.position)
				.map((role) => role.toString())
				.slice(0, -1);
			const userFlags = member.user.flags ? member.user.flags.toArray() : " ";
			const guild = message.guild;
			const embed = new Discord.MessageEmbed().setTimestamp(" ");
			if (member.user.displayAvatarURL())
				embed.setThumbnail(
					member.user.displayAvatarURL({
						dynamic: true,
					})
				);
			if (guild.name)
				embed.setAuthor(
					guild.name,
					guild.iconURL({
						dynamic: true,
					})
				);
			if (guild.bannerURL())
				embed.setImage(
					guild.bannerURL({
						dynamic: true,
					})
				);
			if (member.displayHexColor && member.displayHexColor != '#000000') {
				embed.setColor(member.displayHexColor);
			} else {
				embed.setColor(process.env.EMBED_COLOR);
			}
			if (member.user && member.user.username)
				embed.addField(
					`<:shinoabestwaifu:894338934845341746> Nickname`,
					"```" + `${member.user.username}` + "```"
				);
			if (member.user && member.user.discriminator)
				embed.addField(
					"<:miomybeloved:894338359604961280> " +	"User Tag",
					"```" + `${member.user.discriminator}` + "```",
					true
				);
			if (member.id)
				embed.addField(
					`<:settings:894337722217541632> User ID`,
					"```" + `${member.id}` + "```",
					true
				);
			if (userFlags)
				embed.addField(
					`<:kokomi:894337389802192906> Flags`,
					"```" +
					`${userFlags.length
						? userFlags.map((flag) => flags[flag]).join(", ")
						: "None"
					}` +
					"```",
					true
				);
			if (member.user && member.user.createdTimestamp)
				embed.addField(
					`📆 Registration Date`,
					"```" +
					`${moment(member.user.createdTimestamp).format("LT")}\n${moment(
						member.user.createdTimestamp
					).format("LL")}\n${moment(
						member.user.createdTimestamp
					).fromNow()}` +
					"```",
					true
				);
			if (member.user && member.user.presence && member.user.presence.game)
				embed.addField(
					`<:games:894336517231751180> Game`,
					"```" +
					`${member.user.presence.game} || "Not playing a game."` +
					"```",
					true
				);
			if (member.roles && member.roles.highest.id && member.roles.highest.name)
				embed.addField(
					`<:crowned:894335894377611324> Highest Role`,
					"```" +
					`${member.roles.highest.id === message.guild.id
						? "None"
						: member.roles.highest.name
					}` +
					"```",
					true
				);
			if (member.joinedAt)
				embed.addField(
					"<:joined:894335438570024991>" + "Union Date",
					"```" + `${moment(member.joinedAt).format("LL LTS")}` + "```",
					true
				);
			if (member.roles)
				embed.addField(
					`<:zooming:894334596936790026> Hoist Role`,
					`${member.roles.hoist
						? member.roles.hoist
						: "None"
					}`,
					true
				);
			if (member.user.displayAvatarURL())
				embed.addField(
					"<:yoshino:894333402445135892> Avatar",
					`[Link to Avatar](${member.user.displayAvatarURL({
						dynamic: true,
					})})`,
					true
				);
			if (emblemas && emblemas.Premium.Enabled)
				badges.push("<a:premium:866135287258939393>");
			if (emblemas && emblemas.EarlyPremium.Enabled)
				badges.push("<a:earlypremium:866135322886012978>");
			if (emblemas && emblemas.Tester.Enabled)
				badges.push("<:tester:871395085017813002>");
			if (emblemas && emblemas.Notifications.Enabled)
				badges.push("<:notifications:864103839266897951>");
			if (emblemas && emblemas.Developer.Enabled)
				badges.push("<:developer:866134938185367552>");
			if (emblemas && emblemas.Booster.Enabled)
				badges.push("<:serverbooster:864102069728313354>");
			if (emblemas && emblemas.Support.Enabled)
				badges.push("<:support:863983092702904350>");
		 CodeModel.findOne({ USERID: message.author.id.toString() }).then((s, err) => {
				if (err) {
					if (roles[0])
						embed.addField(
							`<:estrella:894097129822359552> Roles [${roles.length}]`,
							`${roles.length < 10
								? roles.join(" ")
								: roles.length > 10
									? trimArray(roles)
									: "None"
							}`
						);
					return sentMessage.edit({ embeds: [embed] });
				}	
				if (s) {
					if (roles[0])
						embed.addField(
							`<:estrella:894097129822359552> Roles [${roles.length}]`,
							`${roles.length < 10
								? roles.join(" ")
								: roles.length >= 10
									? trimArray(roles)
									: "None"
							}`
						);
					return sentMessage.edit({ embeds: [embed] });
				} else {
					if (roles[0])
						embed.addField(
							`<:estrella:894097129822359552> Roles [${roles.length}]`,
							`${roles.length < 10
								? roles.join(" ")
								: roles.length > 10
									? trimArray(roles)
									: "None"
							}`
						);
					return sentMessage.edit({ embeds: [embed] });
				}
			})
		} catch (e) {
			console.error(e);
			message.channel.send({
				embeds: [
					new Discord.MessageEmbed()
						.setColor("RED")
						.setTitle("Error")
						.setDescription("An unexpected erro happen")
						.setFooter(message.author.username, message.author.avatarURL())
				]
			});
    }
  }
};