import {
  Listener, ListenerOptions, PieceContext
} from '@sapphire/framework';
import chalk from 'chalk';
import { parsed } from '@/lib/cli';

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
    this.schedule();

    this.container.logger.info(`[${chalk.red(dev ? 'DEVELOPMENT' : 'PRODUCTION')}] ${this.container.client.user?.tag} is ready!`);
  }

  schedule() {
    const schedulerStore = this.container.stores.get('schedulers');

    schedulerStore.scheduleAll();
  }

  async createSlashCommands() {
    // this function will tell the SlashCommandStore to update the global and guild commands
    const slashCommandsStore = this.container.stores.get('slashCommands');

    if (slashCommandsStore) {
      try {
        if (parsed.opts().wipe) {
          this.container.logger.info(chalk.yellow('Wiping all commands'));

          await slashCommandsStore.wipeCommands();

          this.container.logger.info(chalk.green('Wiped, exiting...'));
          return process.exit(0);
        }

        this.container.logger.info(chalk.yellow('Registering slash commands...'));
        const total = await slashCommandsStore.registerCommands();
        this.container.logger.info(chalk.green(`Successfully registered ${total} slash commands!`));
      } catch (err) {
        this.container.logger.fatal(chalk.red(err));
      }
    }
  }
}
