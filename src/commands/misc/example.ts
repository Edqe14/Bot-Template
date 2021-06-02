import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

module.exports = class Example extends Command {
  constructor() {
    super('hello', {
      aliases: ['hello'],
      category: 'Misc',
      description: {
        content: 'Hello World!',
        usage: 'hello',
        examples: ['hello'],
      },
      ratelimit: 3,
      channel: 'guild',
    });
  }

  exec(message: Message) {
    message.channel.send('Hello World!');
  }
};
