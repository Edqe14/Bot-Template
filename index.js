const { join } = require('path');
require('dotenv').config({ path: join(__dirname, '.env') });

const config = require('./config.js');
const Client = require('./modules/client.js');

const bot = new Client(config);
bot.start();

module.exports = bot;
