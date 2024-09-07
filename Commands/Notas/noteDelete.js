const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const Note = require("../../models/noteSchema")


module.exports = {
    name: "deletenote",
    usage: `${prefix}deletenote`,
    description: `Elimina nota`,
    emoji: "",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
        const noteId = args.shift();
        const note = await Note.findById(noteId);
        if (note && note.userId === message.author.id) {
            await note.remove();
            message.channel.send('Nota eliminada.');
        } else {
            message.channel.send('Nota no encontrada o no tienes permiso para eliminarla.');
        }
    }
}