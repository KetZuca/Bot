const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const Note = require("../../models/noteSchema")


module.exports = {
    name: "editnote",
    usage: `${prefix}editnote`,
    description: `Edita la nota`,
    emoji: "",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
        const noteId = args.shift();
        const newContent = args.join(' ');
        const note = await Note.findById(noteId);
        if (note && note.userId === message.author.id) {
            note.note = newContent;
            await note.save();
            message.channel.send('Nota editada.');
        } else {
            message.channel.send('Nota no encontrada o no tienes permiso para editarla.');
        }
    }
}