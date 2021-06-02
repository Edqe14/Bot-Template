import { Listener } from 'discord-akairo';

module.exports = class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
      category: 'client',
    });
  }

  exec() {
    console.log(`${this.client.user.tag} is ready!`);
  }
};
