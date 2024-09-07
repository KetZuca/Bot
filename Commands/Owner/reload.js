  
const { Client, Message, MessageEmbed } = require("discord.js");
const prefix = require("../../config.json").prefix;
const glob = require("glob");
module.exports = {
  name: "reload",
  usage: `${prefix}reload`,
  description: "Reload all commands at once",

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "852617123451633705") return;
    client.commands.sweep(() => true);
    glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
      if (err) return console.log(err);
      filePaths.forEach((file) => {
        delete require.cache[require.resolve(file)];

        const pull = require(file);
        if (pull.name) {
          console.log(`Reloaded ${pull.name} (cmd)`);
          client.commands.set(pull.name, pull);
        }
      });
    });
    message.channel.send({ content: "Successfully Reloaded All Commands" });
  },
};