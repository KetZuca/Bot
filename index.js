const { Client, Collection, Intents, Discord } = require('discord.js');
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const chalk = require("chalk");
const client = new Client({ intents: 14023 });
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const keepAlive = require("./server");
const mongoose = require('mongoose')
const mySecret = process.env.TOKEN;
module.exports = client;


mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 3
}).then(() => {
  console.log('Estoy Conectado a MongoDB')
}).catch(err => {
  console.error('Error al conectarme a MongoDB: ' + err);
});



// Slash command handler
client.slashCommands = new Collection();
const slashCommandFiles = fs.readdirSync('./SlashCommands').filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const command = require(`./SlashCommands/${file}`);
	client.slashCommands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.slashCommands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.commands = new Collection();

// Command handler
let folders = fs.readdirSync("./Commands/");

folders.forEach((dir) => {
  const commandFiles = fs
    .readdirSync(`./Commands/${dir}/`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./Commands/${dir}/${file}`);

    client.commands.set(command.name, command);

    console.log(chalk.green(`${command.name} Loaded Successfully [COMMAND]`));
  }
});

// Event handler

let eventFolder = fs.readdirSync("./Events");

eventFolder.forEach((dir) => {
  const eventFiles = fs
    .readdirSync(`./Events/`)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const Event = require(`./Events/${file}`);
    const eventNames = file.split(".")[0];
    console.log(`${eventNames} Loaded Successfully [EVENT]`);
  }
});



keepAlive();
client.login(mySecret);