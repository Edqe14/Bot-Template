import SlashCommand from './SlashCommandPiece';
import { Store } from '@sapphire/framework';

export default class SlashCommandStore extends Store<SlashCommand> {
  constructor() {
    // This is the name of the directory we want to look in for our slash
    // commands.
    super(SlashCommand, { name: 'slashCommands' });
  }

  async registerCommands() {
    const client = this.container.client;
    const [guildCmds, globalCmds] = this.partition(c => c.guildOnly);

    // iterate to all connected guilds and apply the commands.
    const guilds = await client?.guilds?.fetch(); // retrieves Snowflake & Oauth2Guilds
    // eslint-disable-next-line no-restricted-syntax
    for (const [id] of guilds) {
      // eslint-disable-next-line no-await-in-loop
      const guild = await client?.guilds?.fetch(id);
      // eslint-disable-next-line no-await-in-loop
      await guild?.commands.set(guildCmds.map(c => c.commandData));
    }

    // Global commands will update over the span of an hour and is discouraged to
    // update on development mode.
    // https://canary.discord.com/developers/docs/interactions/slash-commands#registering-a-command
    // https://discord.com/developers/docs/interactions/application-commands#making-a-global-command
    if (process.env.NODE_ENV === 'development') return this.container.logger.info('Skipped global commands because we\'re in development mode');

    // This will register global commands.
    await client?.application?.commands.set(globalCmds.map(c => c.commandData));
    return guildCmds.size;
  }
}
