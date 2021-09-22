import {
  Listener, ListenerOptions, PieceContext
} from '@sapphire/framework';
import { blue, green, red } from 'chalk';

const dev = process.env.NODE_ENV !== 'production';

export default class ReadyListener extends Listener {
  constructor(context: PieceContext, options?: ListenerOptions) {
    super(context, {
      ...options,
      event: 'ready',
      once: true
    });
  }

  async run() {
    await this.createSlashCommands();

    this.container.logger.info(`[${red(dev ? 'DEVELOPMENT' : 'PRODUCTION')}] ${this.container.client.user?.tag} is ready!`);
  }

  async createSlashCommands() {
    // this function will tell the SlashCommandStore to update the global and guild commands
    const slashCommandsStore = this.container.stores.get('slashCommands');

    if (slashCommandsStore) {
      try {
        this.container.logger.info(blue('Registering slash commands...'));
        const total = await slashCommandsStore.registerCommands();
        this.container.logger.info(green(`Successfully registered ${total} slash commands!`));
      } catch (err) {
        this.container.logger.fatal(red(err));
      }
    }
  }
}
