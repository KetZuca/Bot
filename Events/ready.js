const client = require("../index");
const config = require("../config.json");
const chalk = require("chalk");

client.on("ready", () => {
  console.log(chalk.cyan(`✅ Successfully logged on as ${client.user.username}`));
 client.user.setActivity('Down with the mafia!', {type: 'WATCHING'})
});