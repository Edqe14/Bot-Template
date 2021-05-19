const { Listener } = require('discord-akairo');

module.exports = class ReadyListener extends Listener {
  constructor () {
    super('missingPermissions', {
      emitter: 'commandHandler',
      event: 'missingPermissions',
      category: 'commandHandler'
    });
  }

  exec (message, command, type, missing) {
    message.reply(`\`${type}\` missing \`${missing}\` permission(s) to run **${command.id}** command.`);
  }
};
