import SlashCommand, { SlashCommandOptions } from '@/lib/structures/slashCommandPiece';
import { ApplyOptions } from '@sapphire/decorators';
import { CommandInteraction } from 'discord.js';

@ApplyOptions<SlashCommandOptions>({
  guildOnly: true,
  commandData: {
    name: 'example',
    description: 'Says "Hey!"'
  }
})
export default class ExampleSlashCommand extends SlashCommand {
  async run(interaction: CommandInteraction) {
    interaction.reply({
      content: 'Hey!',
      ephemeral: true
    });
  }
}
