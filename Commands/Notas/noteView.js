const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const Note = require("../../models/noteSchema")


module.exports = {
    name: "viewnote",
    usage: `${prefix}viewnote`,
    description: `Revisa tus notas`,
    emoji: "",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
        const noteIndex = parseInt(args[0], 10);
        const notes = await Note.find({ userId: message.author.id });

        if (isNaN(noteIndex)) {
            if (notes.length > 0) {
                const noteList = notes.map((note, index) => `Nota ${index + 1}: ${note.note}`).join('\n\n');
                message.channel.send(`Tus notas:\n\n${noteList}`);
            } else {
                message.channel.send('No tienes notas guardadas.');
            }
        } else {
            if (noteIndex > 0 && noteIndex <= notes.length) {
                const note = notes[noteIndex - 1];
                message.channel.send(`Nota ${noteIndex}:\nNota: ${note.note}`);
            } else {
                message.channel.send('Número de nota inválido.');
            }
        }
    }
}