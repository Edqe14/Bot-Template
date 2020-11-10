require('dotenv').config();

const { Client } = require('discord.js');
const { readdir } = require('fs');
const { join } = require('path');
const Collection = require('@discordjs/collection');

const bot = new Client({
  disableEveryone: true
});
bot.setMaxListeners(10000);

const config = bot.config = require('./config.json');

const commands = bot.commands = new Collection();
const cooldowns = bot.cooldowns = new Collection();
readdir(join(__dirname, 'commands'), (e, f) => {
  if (e) throw e;
  const js = f.filter((f) => f.split('.').pop() === 'js');

  if (js.length <= 0) return console.log('No commands is available to load...');
  js.forEach((fi, i) => {
    const c = require(join(__dirname, 'commands', fi));

    console.log(`${i + 1}: ${fi} loaded!`);
    commands.set(c.name, c);
  });
});

readdir(join(__dirname, 'handlers'), (e, files) => {
  if (e) throw e;

  const handlers = files.filter(f => f.split('.').pop() === 'js');
  if (handlers.length <= 0) return console.log('There are no handlers to load...');

  console.log(`Loading ${handlers.length} handlers...`);
  handlers.forEach((f, i) => {
    require(join(__dirname, 'handlers', f))(bot, config, cooldowns);
    console.log(`${i + 1}: ${f} loaded!`);
  });
});

bot.login(process.env.TOKEN)
  .catch(console.error)
  .then(() => console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`));
