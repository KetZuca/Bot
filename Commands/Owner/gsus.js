const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;


module.exports = {
    name: "gsus",
    usage: `${prefix}`,
    description: `Flamea a tu gsu de maneras divertidas!`,
    emoji: "🐶",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
      let who = ["La gsu", "La perra gsus", "la doggy gsus", "Gsus en cuatro", "la cachorrita"];
      let action = ["moldio", "se trago", "olfateo", "manoseo"];
      let what = ["mi polla", "el culo", "el control", "el dildo"];
      let when = [ "cuando estaba hot","cuando pensaba en amber","desde que llegue","durante todo el almuerzo","mientras jugaba papa y mama",];

      let quien = Math.floor(Math.random() * who.length);
      let accion = Math.floor(Math.random() * action.length);
      let que = Math.floor(Math.random() * what.length);
      let cuando = Math.floor(Math.random() * when.length); //

      message.channel.send(who[quien] + " " + action[accion] + " " + what[que] + " " + when[cuando]);
    }
}