const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
const Note = require("../../models/noteSchema")

module.exports = {
    name: "addnote",
    usage: `${prefix}addnote`,
    description: `Añade una nota`,
    emoji: "",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
        const noteContent = args.join(' ');
        const note = new Note({
            userId: message.author.id,
            note: noteContent,
        });
        await note.save();
        message.channel.send('Nota añadida.');
    }
}