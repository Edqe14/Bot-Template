import { join } from 'path';
import {
  AkairoClient,
  CommandHandler,
  ListenerHandler,
  InhibitorHandler,
} from 'discord-akairo';
import { configInterface } from '../config';

export default class Client extends AkairoClient {
  public config: configInterface;
  public listenerHandler: ListenerHandler;
  public commandHandler: CommandHandler;
  public inhibitorHandler: InhibitorHandler;

  constructor(config: configInterface) {
    super(
      {
        ownerID: config.ownerIDs,
      },
      {
        disableMentions: 'everyone',
      }
    );

    this.config = config;
    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, '..', 'listeners'),
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
          time: 30000,
        },
        otherwise: '',
      },
      ignorePermissions: this.config.ownerIDs,
    });
    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, '..', 'inhibitors'),
    });
  }

  /**
   * Initialize handlers & listeners
   */
  _init(): void {
    this.commandHandler
      .useInhibitorHandler(this.inhibitorHandler)
      .useListenerHandler(this.listenerHandler);
    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      listenerHandler: this.listenerHandler,
      process,
    });

    this.inhibitorHandler.loadAll();
    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
  }

  /**
   * Start the bot
   */
  start(): Client {
    this._init();
    this.login(this.config.token);
    return this;
  }
}
