const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "rolebutton",
  description: "Send a message with buttons to add roles",
  usage: `${prefix}rolebutton`,
  emoji: ":record_button:",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const row = new Discord.MessageActionRow() 

.addComponents( 

new Discord.MessageButton() 
.setCustomId('BotonNro1') 
.setLabel('Boton 1') 
.setStyle('SUCCESS'), 

new Discord.MessageButton() 
.setCustomId('BotonNro2') 
.setLabel('Boton 2') 
.setStyle('SECONDARY') 

) 

const roleEmbed = new MessageEmbed()
.setTitle('Hi, you can select a role here')
.setThumbnail(client.user.displayAvatarURL({
  size: 1024,
}))
.addField('Button 1', 'Gives you test role')
.addField('Button 2', 'Gives you a second test role')
const msg = await message.channel.send({ embeds: [roleEmbed], components: [row] }) 

const filter = (mensajeBoton) => mensajeBoton.clicker.id === message.author.id; 
const collector = msg.createMessageComponentCollector(filter, { time: 30000 }) 

collector.on('collect', async (x) => { 

const rolboton1 = message.guild.roles.cache.get('886505763395231764') 
const rolboton2 = message.guild.roles.cache.get('886506208465395762') 

if(x.customId === 'BotonNro1'){

await x.deferUpdate() 
x.member.roles.add(rolboton1) 

}

if(x.customId === 'BotonNro2'){ 

await x.deferUpdate()
x.member.roles.add(rolboton2) 

} 

}) 
 

  }
}