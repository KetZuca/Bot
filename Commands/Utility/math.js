const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const math = require('mathjs');



module.exports = {
    name: "math",
    usage: `${prefix}math <operation>`,
    description: `Do some maths`,
    emoji: "<:Math:888243995430486028>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      const user = message.mentions.users.first() || message.author;     

        try {
            const embedcal = new MessageEmbed()
        .setTitle("✅ `|` Recibido")
        .addField('📥 `|` Operación', `${args.join(" ")}`)
        .addField('📤 `|` Solución', `${math.evaluate(args.join(" "))}`)
        .setColor(process.env.EMBED_COLOR)
        .setFooter(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
            message.channel.send({ embeds: [embedcal] })
        }catch(err){
          const embederror = new MessageEmbed()
        .setTitle("❌ `|` Error")
        .setColor("RED")
        .setDescription("📇 Debes de colocar la **operación que deseas calcular**\n**Por ejemplo:** 2 + 2\n\n"+err.message)
        .setFooter(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp() 

            message.channel.send({ embeds: [embederror] })
        }

    }
}