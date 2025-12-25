// === Imports and Setup ===
const { Client, Util, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// === Bot and Client ===
const client = new Discord.Client({ ws: { properties: { $browser: 'Discord iOS' } } });
const PREFIX = 'a.';
const queue = new Map();
let owner = 'OWNER';
const discordToken = process.env.TOKEN;

// === Command Handler Loader ===
const commands = new Map();
const commandsPath = path.join(__dirname, 'commands');
function loadCommands(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      loadCommands(fullPath);
    } else if (file.endsWith('.js')) {
      const command = require(fullPath);
      if (command && command.name) {
        commands.set(command.name, command);
        if (Array.isArray(command.aliases)) {
          command.aliases.forEach(alias => commands.set(alias, command));
        }
      }
    }
  });
}
loadCommands(commandsPath);

// === Bot Events ===
client.on('ready', async () => {
  console.log(`[READY] ${client.user.tag} has been successfully booted up!`);
  let setatus = [
    `in ${client.guilds.cache.size} servers`,
    `on ${client.channels.cache.size} channels`,
    `with ${client.users.cache.size} dumbass`,
    `Mobile Legends`,
    `ROBLOX`,
    `GitHub`,
    `with you`,
  ];
  setInterval(() => {
    let index = Math.floor(Math.random() * setatus.length);
    client.user.setActivity(setatus[index], {
      type: 'STREAMING',
      URL: 'https://www.twitch.tv/chillhopmusic',
    });
  }, 20000);
});

client.on('warn', console.warn);
client.on('error', console.error);

// === Voice State Update for Queue Cleanup ===
client.on('voiceStateUpdate', (mold, mnew) => {
  if (!mold.channelID) return;
  if (!mnew.channelID && client.user.id == mold.id) {
    const serverQueue = queue.get(mold.guild.id);
    if (serverQueue) queue.delete(mold.guild.id);
  }
});

// === Message Event: Command Routing ===
client.on('message', async (message) => {
  // Respond to mention with prefix
  let meseg = message.content.toLowerCase();
  if (meseg === `<@${client.user.id}>` || meseg === `<@!${client.user.id}>`) {
    message.channel.send(`My Prefix = \`a.\``);
    return;
  }
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const input = args.join(' ');
  const command = commands.get(commandName);
  if (!command) return;
  try {
    await command.execute({
      client,
      message,
      args,
      input,
      Discord,
      MessageEmbed,
      owner,
      PREFIX,
      queue,
      commands
    });
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing that command.');
  }
});

client.login(discordToken);

// === Global Error Handling ===
process.on('unhandledRejection', (reason, promise) => {
  try {
    console.error('Unhandled Rejection at: ', promise, 'reason: ', reason.stack || reason);
  } catch {
    console.error(reason);
  }
});

process.on('uncaughtException', (err) => {
  console.error(`Caught exception: ${err}`);
  process.exit(1);
});
