const { MessageEmbed, Message, Client } = require("discord.js");
const { readdirSync } = require("fs");
const color = process.env.EMBED_COLOR
const prefix = require("../../config.json").prefix;
module.exports = {
  name: "help",
  usage: `${prefix}help`,
  emoji: "ℹ",
  description: "Shows all available bot commands.",
  /**
   * 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String} args 
   * @returns 
   */
  run: async (client, message, args) => {
    if (!args[0]) {
      let categories = [];

      let ignored = ["owner"];

      const emo = {
        fun: "🎆",
        image: "🖼️",
        info: "❓",
        moderation: "⚒️",
        utility: "⚙️",
        owner: "👑",
        tutorial: "📚",
        interaction: "<:Kanna:892572905572007978>",
        sessions: "<:poker:893311194117578752>",
      };

      readdirSync("./Commands/").forEach((dir) => {
        if (ignored.includes(dir.toLowerCase())) return;
        const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
        let cats = new Object();

        cats = {
          name: name,
          value: `\`${prefix}help ${dir.toLowerCase()}\``,
          inline: true,
        };

        categories.push(cats);
      });

      
    

      const embed = new MessageEmbed()
        .setTitle("Help Menu:")
        .setDescription(
          `\`\`\`js\nPrefix: ${prefix}\nParameters: <> = required, [] = optional\`\`\`\n[Invite me](https://discord.com/oauth2/authorize?client_id=881998636186210384&permissions=8&scope=bot%20applications.commands)\n\nTo check out a category, use command \`${prefix}help [category]\` For more information go to the next page by reacting!\n\n__**Categories**__`
        )
        .addFields(categories)
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true,
          })
        )
        .setTimestamp()
        .setThumbnail(
          client.user.displayAvatarURL({
            dynamic: true,
          })
        )
        .setColor(color);

      return message.channel.send({ embeds: [embed] });
    } else {
      let cots = [];
      let catts = [];

      readdirSync("./Commands/").forEach((dir) => {
        if (dir.toLowerCase() !== args[0].toLowerCase()) return;
        const commands = readdirSync(`./Commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../Commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          let des = `${client.commands.get(name).description}`;
          let emo = `${client.commands.get(name).emoji}`;

          let obj = {
            cname: `${emo} \`${name}\``,
            des,
          };

          return obj;
        });

        let dota = new Object();

        cmds.map((co) => {
          dota = {
            name: `${cmds.length === 0 ? "In progress." : co.cname}`,
            value: co.des ? co.des : "No Description",
            inline: true,
          };
          catts.push(dota);
        });

        cots.push(dir.toLowerCase());
      });

      // console.log(cots);

      const command = client.commands.get(args[0].toLowerCase()); // ||
      // client.commands.find(
      //   (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
      // );

      if (cots.includes(args[0].toLowerCase())) {
        const combed = new MessageEmbed()
          .setTitle(
            `__${
              args[0].charAt(0).toUpperCase() + args[0].slice(1)
            } Commands!__`
          )
          .setDescription(
            `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`
          )
          .addFields(catts)
          .setColor(color);

        return message.channel.send({ embeds: [combed] });
      }

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(
            `Invalid command! Use \`${prefix}help\` for all of my commands!`
          )
          .setColor("RED");
        return message.channel.send({ embeds: [embed] });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        // .addField(
        //   "Aliases:",
        //   command.aliases
        //     ? `\`${command.aliases.join("` `")}\``
        //     : "No aliases for this command."
        // )
        .addField(
          "Usage:",
          command.usage
            ? `\`${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Command Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({
            dynamic: true,
          })
        )
        .setTimestamp()
        .setColor(color);
      return message.channel.send({ embeds: [embed] });
    }
  },
};