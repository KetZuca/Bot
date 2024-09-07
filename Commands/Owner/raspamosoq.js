const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "raspamosoq",
    usage: `${prefix}`,
    description: `vetealaverga`,
    emoji: "☠️",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      const num1 = args.join[" "]
if (num1 === 2) {
  if (2 === 3) {
    message.channel.send("son iguales manito")
  }} else {
    if (num1 > 2) {
      const num_mayor = num1
      const num_menor = 2
    } else {
      const num_mayor = 2
      const num_menor = num1
    
    if (`${num_mayor}` > 3) {
      message.channel.send("el numero mayor es " + `${num_mayor}`)
    } else {
      message.channel.send("el numero mayor es 3")
  }
    if (`${num_menor}` < 3) {
      message.channel.send("el numero menor es " + `${num_menor}`)
} else {
      message.channel.send("el numero menor es 3")
}
}
      }
}
}