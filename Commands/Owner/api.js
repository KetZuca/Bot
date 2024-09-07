const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "api",
    usage: `${prefix}api`,
    description: `ah mano testeo`,
    emoji: "😐",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
fetch("https://gsi-api.herokuapp.com/")
      .then((res) => res.json())
      .then(function (dataObject) {
  console.log(dataObject.endpoints.characters)
      
      })
    }
}