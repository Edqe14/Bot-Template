const { Listener } = require('discord-akairo');

module.exports = class ReadyListener extends Listener {
  constructor () {
    super('unhandledRejection', {
      emitter: 'process',
      event: 'unhandledRejection',
      category: 'process'
    });
  }

  async exec (reason, promise) {
    if (reason instanceof Error && reason.message.includes('Unknown Message')) return;
    console.error('UnhandledRejection', reason, promise);
  }
};
