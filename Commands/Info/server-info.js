const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

module.exports = {
    name: "serverinfo",
    usage: `${prefix}serverinfo`,
    description: `Display info about this server.`,
    emoji: "<:server:894345392886513674>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
try {
      let region = {
        europe: "Europa",
        brazil: "Brasil",
        hongkong: "Hong Kong",
        japan: "Japón",
        russia: "Rusia",
        singapore: "Singapur",
        southafrica: "Sudáfrica",
        sydney: "Sydney",
        "us-central": "Central US",
        "us-east": "Este US",
        "us-south": "Sur US",
        "us-west": "Oeste US",
        "vip-us-east": "VIP US Este",
        "eu-central": "Europa Central",
        "eu-west": "Europa Oeste",
        london: "London",
        amsterdam: "Amsterdam",
        india: "India",
      };

      let verification = {
        NONE: "No restrictions.",
        LOW: "Low (Verified account).",
        MEDIUM: "Medium (Verified account for +5 minutes).",
        HIGH: "High (Verified account and member for +10 minutes).",
        VERY_HIGH: "Extreme (Verified account y verified phone number linked).",
      };

      let explicitContent = {
        DISABLED: "No messages are scanned.",
        MEMBERS_WITHOUT_ROLES: "Scan users without a role.",
        ALL_MEMBERS: "Scan every message.",
      };
      const guild = message.guild;
      const channel = guild.channels.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role.toString())
        .slice(0, -1);
      const members = guild.members.cache;
      const role = guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map((role) => role.toString())
        .slice(0, -1);
      const boost = guild.premiumTier;
      const emojis = message.guild.emojis.cache;
      const boostcount = guild.premiumSubscriptionCount;
      const bots = members.filter((member) => member.user.bot).size;
      const humans = members.filter((member) => !member.user.bot).size;
      const create = moment(message.guild.createdTimestamp).format(
        "DD-MM-YYYY"
      );
      const banner = guild.banner;

      message.channel.send({ embeds: [
        new Discord.MessageEmbed()
          .setColor(process.env.EMBED_COLOR)
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .setTimestamp()
          .setFooter(guild.name, guild.iconURL({ dynamic: true }))
          .setTitle(guild.name)
          .addField(
            `<:admins:894338711595147314> Owner`,
            `<@${guild.ownerId}>`
          )
          .addField(
            "Guild ID",
            "```" + `${guild.id}` + "```",
            true
          )
          .addField( `<:hello:894346417894727710> Members`, "```" + `${guild.memberCount}` + "```", true )
          .addField( `😀 Emoji Count [${emojis.size}]`, `<:joined:894335438570024991> Regular: ${emojis.filter((emoji) => !emoji.animated).size }\n<:arrow:893307266399342652> Animated: ${emojis.filter((emoji) => emoji.animated).size}`, true )
          .addField( `<:estrella:894097129822359552> Roles`, "```" + `${role.length}` + "```", true )
          .addField( `<:sacarossa:795015839513837616> Channels [${guild.channels.cache.size}]`, `<:category:894347762345316423> Categories: ${guild.channels.cache.filter((x) => x.type === "GUILD_CATEGORY").size}\n<:textchannel:895132067065647154> Text: ${guild.channels.cache.filter((x) => x.type === "GUILD_TEXT").size }\n<:voicechannel:895132294472421446> Voice: ${guild.channels.cache.filter((x) => x.type === "GUILD_VOICE").size}`, true )
          .addField( `📆 Created At`, "```" + `${create}` + "```", true )
          .addField( `<:boost:895132631581216828> Boosters`, "```" + `${boostcount}` + "```", true )
          .addField( `💸 Tier Level`, `${boost ? "```" + `Tier ${boost}` + "```" : "```" + `No` + "```" }`, true, true )
          .addField( `**Verification Level**`, `${verification[guild.verificationLevel]}` )
          .addField( `**Explicit Content Filter Level**`, "```" + `${explicitContent[guild.explicitContentFilter]}` + "```" )
          .setImage(guild.bannerURL({ dynamic: true }))
      ]});
    } catch (e) {
      console.error(e);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("An unexpected error happen")
          .setDescription(client.language.fatal_error)
          .setFooter(message.author.username, message.author.avatarURL())
        ]
      });
    }
}
}