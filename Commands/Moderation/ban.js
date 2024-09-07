const { Client, Message, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "ban",
  description: "Ban's a user",
  usage: `${prefix}ban <user>`,
  emoji: "\:x:",

  run: async (client, message, args) => {

if (!message.guild.me.permissions.has('BAN_MEMBERS'))
  return message.channel.send('No tengo permisos para banear');




let persona = message.mentions.members.first() || message.guild.members.resolve(args[0]);

if (!persona) return message.channel.send('You need to mention someone to ban');
if (!persona.bannable) return message.channel.send('I cant ban this person');
if (persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0)
  return message.channel.send('This user has a higher or equal rank than you.');

var razon = args.slice(1).join(' ');
if (!razon) razon = 'Razon no especificada';

let usuario = message.member;

const banEmbed = new MessageEmbed()
.setTitle('New Ban')
.setThumbnail(usuario.user.displayAvatarURL({
  size: 1024,
  dynamic: true,
}))
.addField('Reason', `${razon}`)
.setColor(process.env.EMBED_COLOR)
message.guild.members
  .ban(persona, {
    reason: `${razon}, Baneado por ${message.author.tag}`,
  })
  .catch ((e) => message.reply('Happens a unexpected error'))
  .then(() => message.channel.send({embeds: [banEmbed]}));
  }
}