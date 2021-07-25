import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';

module.exports = class ReadyListener extends Listener {
  constructor() {
    super('missingPermissions', {
      emitter: 'commandHandler',
      event: 'missingPermissions',
      category: 'commandHandler',
    });
  }

  exec(
    message: Message,
    command: Command,
    type: 'client' | 'user',
    missing: string
  ) {
    message.reply(
      `\`${type}\` missing \`${missing}\` permission(s) to run **${command.id}** command.`
    );
  }
};
