const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
  data: new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Shows the user avatar')
  .addUserOption(option =>
            option.setName('user')
                .setDescription('User to kick.')
                .setRequired(true)),
  
  async execute(interaction) {
    const user = interaction.options.getUser('user')

    const avatarEmbed = new MessageEmbed()
    .setTitle(`${user.username}'s Avatar`)
    .setColor('RANDOM')
    .setImage(user.displayAvatarURL({
      dynamic: true,
      size: 1024
    }))
    .setDescription(`[Png](${user.avatarURL({ format: 'png' })}) | [Webp](${user.avatarURL({ dynamic: true })}) | [Jpg](${user.avatarURL({ format: 'jpg' })})`)
    .setFooter(`Requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true}))
    interaction.reply({embeds: [avatarEmbed]})
  }
}