import { Logger, LogLevel } from '@sapphire/framework';
import { ClientOptions, Intents } from 'discord.js';
import Dotenv from 'dotenv';
import { join } from 'path';

Dotenv.config({
  path: join(__dirname, '..', '.env')
});

export interface Config extends ClientOptions {
  owners: string[];
  debug?: boolean;
  autoEphemeral?: boolean;
  autoDefer?: boolean;
}

export const PREFIX = 'sp!';
export const CLIENT_CONFIG: Config = {
  defaultPrefix: PREFIX,
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.DIRECT_MESSAGES
  ],
  logger: {
    instance: new Logger(LogLevel.Debug)
  },
  owners: [],
  baseUserDirectory: __dirname,
  presence: {
    activities: [{
      name: 'to your request',
      type: 'LISTENING'
    }]
  },
  debug: process.env.NODE_ENV !== 'production'
};
export const TOKEN = process.env.TOKEN;

export default CLIENT_CONFIG;
