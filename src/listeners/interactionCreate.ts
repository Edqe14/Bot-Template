import { Listener } from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';

export class InteractionCreate extends Listener {
  public async run(interaction: CommandInteraction) {
    if (!interaction.isCommand()) return;

    const cmd = this.container.stores.get('slashCommands').get(interaction.commandName);
    if (!cmd || !cmd.run) return;

    try {
      cmd.run(interaction);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const fatal = (err: any) => this.container.logger.fatal(err);
      fatal(e);

      const body = {
        content: `There was a problem with your request.\n\`\`\`${e.message}\`\`\``,
        ephemeral: true
      };

      if (interaction.replied) {
        interaction.followUp(body).catch(fatal);
      } else if (interaction.deferred) {
        interaction.editReply(body).catch(fatal);
      } else {
        interaction.reply(body).catch(fatal);
      }
    }
  }
}
