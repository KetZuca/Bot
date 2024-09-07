const { Client, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const prefix = require("../../config.json").prefix;
let role;
let user;

module.exports = {
    name: "role",
    usage: `${prefix}role <add/del> <role id/@role> <user id/@user>`,
    description: `Adds a role to the user!`,
    emoji: "<:Ham:892952790165495888>",
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
    run: async (client, message, args) => {
   try {
    /**      if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_MESSAGES")) {
        message.reply({ content: `I don't have the permission  \`"MANAGE_MESSAGES"\``})
      } else {
        if (!message.deleted) message.delete().catch((e) => console.log(e));
       
   }
 */ 
      if(!args[0]) {
        const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription("You need to select a option <add/del>")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
      } else if(!args[0]) {
        const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription("You need to select a option <add/del>")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
      }

      if (args[0].toLowerCase() == "add") {
        if (!args[2]) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription("No user has been selected.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }
        if (!args[1]) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription("No role has been selected.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }
        role =
          message.mentions.roles.first() ||
          message.guild.roles.cache.find(
            (r) => r.id == args[1].replace("<@&", "").replace(">", "")
          );

        user =
          message.mentions.members.first() || await message.guild.members.fetch(args[2].replace("<@", "").replace(">", "")).catch(e => {
            return
          });
        let owner = message.guild.ownerId;

        if (message.author.id == owner) {
        

          if (!user) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("I wasn't able to find the user.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          if (!role) {
            const awebo = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle('Error')
              .setDescription("I wasn't able to find the role.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [awebo]});
          }

          if (!role.editable) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("The selected role is higher than Power's on role's hierarchy.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          if (user.roles.cache.has(role.id)) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription(
                `User ${user} already has the role ${role}.`
              )
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          await user.roles.add(role.id); 
          const embed = new Discord.MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle("Success")
            .setDescription(
              `Role ${role} has been added to ${user} succesfully!`
            )
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [embed]});
        }

        if (!args[2]) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription("No user has been selected.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (!user) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("I wasn't able to find the user.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (user.id == owner) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("You can't add roles to the owner.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (user == message.author.id) {
          

          if (!args[2]) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("No role has been selected.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }
          if (!role) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("I wasn't able to find the role.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          if (role.comparePositionTo(message.member.roles.highest) >= 0) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("You can't select a role superior or similar as yours on role's hierarchy.",)
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          if (!role.editable) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("The selected role is higher than Power's on role's hierarchy.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          if (user.roles.cache.has(role.id)) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription(`You've got already the role ${role}.`)
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          await user.roles.add(role.id);
          const embed = new Discord.MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle("Success")
            .setDescription(
              `${user} has added the role ${role} itself succesfully!`
            )
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [embed]});
        }

        if (
          message.member.roles.highest.comparePositionTo(user.roles.highest) <=
          0
        ) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("You can't add roles to that user, he may have higher or similar roles as yours on role's hierarchy.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (!args[1]) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("No role has been selected.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }
        if (!role) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("I wasn't able to find the role.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }
        if (role.comparePositionTo(message.member.roles.highest) >= 0) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("You can't select a role superior or similar as yours on role's hierarchy.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (!role.editable) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("The selected role is higher than Power's on role's hierarchy.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (user.roles.cache.has(role.id)) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription(`That user already has the role ${role}`)
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        await user.roles.add(role.id); 
        const embed = new Discord.MessageEmbed()
          .setColor(process.env.EMBED_COLOR)
          .setTitle("Success")
          .setDescription(
            `Role ${role} has been added to ${user} succesfully!`
          )
          .setFooter(message.author.username, message.author.avatarURL());
        return message.channel.send({embeds: [embed]});
      } else if (args[0].toLowerCase() == "del") {
        if (!args[2]) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription("No user has been selected.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }
        if (!args[1]) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription("No role has been selected.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }
        role =
          message.mentions.roles.first() ||
          message.guild.roles.cache.find(
            (r) => r.id == args[1].replace("<@&", "").replace(">", "")
          );

        user =
          message.mentions.members.first() || await message.guild.members.fetch(args[2].replace("<@", "").replace(">", "")).catch(e => {
            return
          });
        let owner = message.guild.ownerId;

        if (message.author.id == owner) {
        

          if (!user) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("I wasn't able to find the user.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          if (!role) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle('Error')
              .setDescription("I wasn't able to find the role.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          if (!role.editable) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("The selected role is higher than Power's on role's hierarchy.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          

          await user.roles.remove(role.id); 
          const embed = new Discord.MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle("Success")
            .setDescription(
              `Role ${role} has been removed from ${user} succesfully!`
            )
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [embed]});
        }

        if (!args[2]) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription("No user has been selected.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (!user) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("I wasn't able to find the user.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (user.id == owner) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("You can't remove roles to the owner.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (user == message.author.id) {
          

          if (!args[2]) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("No role has been selected.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }
          if (!role) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("I wasn't able to find the role.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          if (role.comparePositionTo(message.member.roles.highest) >= 0) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("You can't select a role superior or similar as yours on role's hierarchy.",)
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

          if (!role.editable) {
            const errorembed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Error")
              .setDescription("The selected role is higher than Power's on role's hierarchy.")
              .setFooter(message.author.username, message.author.avatarURL());
            return message.channel.send({embeds: [errorembed]});
          }

         
          await user.roles.remove(role.id);
          const embed = new Discord.MessageEmbed()
            .setColor(process.env.EMBED_COLOR)
            .setTitle("Success")
            .setDescription(
              `Role ${role} has been removed from ${user} succesfully!`
            )
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [embed]});
        }

        if (
          message.member.roles.highest.comparePositionTo(user.roles.highest) <=
          0
        ) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("You can't remove roles to that user, he may have higher or similar roles as yours on role's hierarchy.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (!args[1]) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("No role has been selected.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }
        if (!role) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("I wasn't able to find the role.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }
        if (role.comparePositionTo(message.member.roles.highest) >= 0) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("You can't select a role superior or similar as yours on role's hierarchy.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }

        if (!role.editable) {
          const errorembed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Error")
            .setDescription("The selected role is higher than Power's on role's hierarchy.")
            .setFooter(message.author.username, message.author.avatarURL());
          return message.channel.send({embeds: [errorembed]});
        }


        await user.roles.remove(role.id);
        const embed = new Discord.MessageEmbed()
          .setColor(process.env.EMBED_COLOR)
          .setTitle("Success")
          .setDescription(
            `Role ${role} has been removed from ${user} succesfully!`
          )
          .setFooter(message.author.username, message.author.avatarURL());
        return message.channel.send({embeds: [embed]});

      }
    } catch (e) {
      console.error(e);
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("Error")
          .setDescription("An unexpected error happen")
          .setFooter(message.author.username, message.author.avatarURL())
        ]
      });
    }
    }
}