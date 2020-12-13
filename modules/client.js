const { join } = require('path');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

class Client extends AkairoClient {
  constructor (config) {
    super({
      ownerID: config.ownerIDs
    }, {
      disableMentions: 'everyone'
    });

    this.config = config;
    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, '..', 'listeners')
    });
    this.commandHandler = new CommandHandler(this, {
      directory: join(__dirname, '..', 'commands'),
      prefix: this.config.prefix,
      allowMention: true,
      handleEdits: false,
      commandUtil: true,
      commandUtilLifetime: 300000,
      defaultCooldown: 5000,
      argumentDefaults: {
        prompt: {
          modifyStart: (_, str) =>
            `${str}\n\nType 'cancel' to cancel the command...`,
          modifyRetry: (_, str) =>
            `${str}\n\nType 'cancel' to cancel the command...`,
          timeout: 'You took too long, the command has been cancelled.',
          ended:
            'You exceeded the maximum tries, this command has been cancelled.',
          retries: 3,
          time: 30000
        },
        otherwise: ''
      },
      ignorePermissions: this.config.ownerIDs
    });
  }

  /**
   * Initialize handlers & listeners
   */
  async _init () {
    this.commandHandler.useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process
    });

    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  /**
   * Start the bot
   */
  async start () {
    await this._init();
    return this.login(this.config.token);
  }
}

module.exports = Client;
