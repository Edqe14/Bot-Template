const { Command } = require('discord-akairo');

module.exports = class Example extends Command {
  constructor () {
    super('hello', {
      aliases: ['hello'],
      category: 'Misc',
      description: {
        content: 'Hello World!',
        usage: 'hello',
        examples: ['hello']
      },
      ratelimit: 3,
      channel: 'guild'
    });
  }

  exec (message) {
    message.channel.send('Hello World!');
  }
};
