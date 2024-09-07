const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "impostor",
    alias: "sus",
    usage: `${prefix}impostor [user]`,
    description: `Are you the impostor? Let's try it.`,
    emoji: "<:sus:892567860684144670>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      try {
			let mencionado;
			if (args[0]) {
				mencionado = message.mentions.members.first() || await message.guild.members.fetch(args[0].replace("<@", "").replace(">", "")).catch(e => {
					return
				})
			}
			if (!mencionado && args[0]) {
				const errorembed = new Discord.MessageEmbed()
					.setColor("RED")
					.setTitle('Error')
					.setDescription(
						"Either the ID or the mention do not correspond to a user."
					)
					.setFooter(message.author.username, message.author.avatarURL());
				return message.channel.send({embeds: [errorembed]})
			}
			let random = ["Wasn't the impostor", "Was the impostor"]; 

			if (!mencionado)
			

				return message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
            　　　.　　　 　　.　　　　　。　　 。　. 　
    
            .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•
    
            　　ﾟ　　 ${message.author.username} ${random[Math.floor(Math.random() * random.length)]
					} 　 。　.
    
            　　'　　　  　 　　。     ,         ﾟ             ,   ﾟ      .       ,        .             ,
    
            　　ﾟ　　　.　　　. ,　　　　.　 .`); 

			message.channel.send(`. 　　　。　　　　•　 　ﾟ　　。 　　.
    
            　　　.　　　 　　.　　　　　。　　 。　. 　
    
            .　　 。　　　　　 ඞ 。 . 　　 • 　　　　•.                                     .
    
            　　ﾟ　　 ${mencionado.user.username} ${random[Math.floor(Math.random() * random.length)]
				} 　 。　.
    
            　　'　　　  　 　　。                                          .
            。  
            　　ﾟ　　　.　　　. ,　　　　.　 .`);
		} catch (e) {
			console.error(e);
			message.channel.send({ embeds: [
				new Discord.MessageEmbed()
					.setColor("RED")
					.setTitle(`Error`)
					.setDescription("An unexpected error happen")
					.setFooter(message.author.username, message.author.avatarURL())
			]});
    }
    }
}