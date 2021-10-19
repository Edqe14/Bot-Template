/* Reference:
 * https://github.com/YorkAARGH/Sapphire-slashies-example/blob/master/src/lib/structures/SlashCommandPiece.js
 */
import { Piece, PieceContext, PieceOptions } from '@sapphire/framework';
import type { ApplicationCommandData, CommandInteraction } from 'discord.js';

export interface SlashCommandOptions extends PieceOptions {
  commandData: ApplicationCommandData;
  guildOnly?: boolean;
  preconditions?: string[];
}

declare interface SlashCommand {
  // eslint-disable-next-line no-unused-vars
  run(interaction: CommandInteraction): unknown;
}

// eslint-disable-next-line no-redeclare
class SlashCommand extends Piece {
  public readonly guildOnly: boolean;

  public readonly commandData: ApplicationCommandData;

  public readonly preconditions: string[];

  constructor(context: PieceContext, options: SlashCommandOptions) {
    super(context, options);

    this.guildOnly = options.guildOnly ?? false;
    this.commandData = options.commandData;
    this.preconditions = options.preconditions ?? [];
  }
}

export default SlashCommand;
