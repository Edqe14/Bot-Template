/* Reference:
 * https://github.com/YorkAARGH/Sapphire-slashies-example/blob/master/src/lib/structures/SlashCommandStore.js
 */
import SlashCommand from './slashCommandPiece';
import { Store } from '@sapphire/framework';

export default class SlashCommandStore extends Store<SlashCommand> {
  constructor() {
    super(SlashCommand, { name: 'slashCommands' });
  }

  async registerCommands() {
    const client = this.container.client;
    const [guildCmds, globalCmds] = this.partition(c => c.guildOnly);

    const guilds = await client?.guilds?.fetch();

    await Promise.all(guilds.map(async (_, id) => {
      try {
        const guild = await client?.guilds?.fetch(id);

        await guild?.commands.set(guildCmds.map(c => c.commandData));
      } catch {
        this.container.logger.error(`Failed to register guild commands for guild ${id}`);
      }
    }));

    if (process.env.NODE_ENV === 'development') {
      this.container.logger.info('Skipped global commands because we\'re in development mode');
      return guildCmds.size;
    }

    await client.application?.commands.set(globalCmds.map(c => c.commandData));

    return guildCmds.size;
  }
}
