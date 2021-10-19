import CommandEventPayload from '@/types/CommandEventPayload';
import {
  Args,
  Command,
  Listener, ListenerOptions, PieceContext
} from '@sapphire/framework';

interface CommandErrorPayload extends CommandEventPayload {
  args: Args;
  piece: Command;
}

export default class CommandErrorListener extends Listener {
  constructor(context: PieceContext, options?: ListenerOptions) {
    super(context, {
      ...options,
      event: 'commandError'
    });
  }

  async run(
    error: Error,
    { message, piece }: CommandErrorPayload
  ) {
    this.container.logger.error(error);
    if (message) {
      message.reply(`Whoops! Look like there was an error in the command you just ran.\n\n__**Debug**__\n\`\`\`js\nName: ${piece.name}\nTimestamp: ${message.createdTimestamp}\n\n${error.name}: ${error.message}\`\`\``);
    }
  }
}
