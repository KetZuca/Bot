const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge messages. Note: I can\'t purge messages older than 14 days.')
        .addNumberOption(option =>
            option
                .setName('number')
                .setDescription('Number of messages to purge. Limit: 100.')
                .setRequired(true)),

    async execute(interaction) {
        const Discord = require('discord.js');
        const number = interaction.options.getNumber('number');
        const fetch = await interaction.channel.messages.fetch({ limit: number });
        const embed = new Discord.MessageEmbed()
            embed.setColor('RED')
            embed.setDescription(`**-** You are missing permissions. **MANAGE_MESSAGES** permission is required for this slash command.`);
        const embed2 = new Discord.MessageEmbed()
            embed2.setColor('RED')
            embed2.setDescription(`**-** You must enter a numeric number from **1 to 100**.`);
        const embed3 = new Discord.MessageEmbed()
            embed3.setColor('RED')
            embed3.setDescription(`**-** I'm missing **MANAGE_MESSAGES** permission.`);
        const embed4 = new Discord.MessageEmbed()
            embed4.setColor(process.env.EMBED_COLOR)
            embed4.setDescription(`**-** Successfully purged **${fetch.size}** messages.`)
            .setFooter('Due to discord limitation I can\'t purge more than 100 messages or messages older than 14 days.');
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return await interaction.deferReply(), await setTimeout(() => { }, 2500), interaction.editReply({ embeds: [embed] })
        };
        if (number < 1 || number > 100) {
            return await interaction.deferReply(), await setTimeout(() => { }, 2500), interaction.editReply({ embeds: [embed2] })
        };
        if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return await interaction.deferReply(), await setTimeout(() => { }, 2500), interaction.editReply({ embeds: [embed3] })
        };
        await interaction.channel.bulkDelete(fetch, true).then(await interaction.deferReply(), await setTimeout(() => { }, 2500), interaction.editReply({ embeds: [embed4] }));
    },
};