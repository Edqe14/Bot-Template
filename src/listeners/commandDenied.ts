import CommandEventPayload from '@/types/CommandEventPayload';
import replyInteraction from '@/utils/replyInteraction';
import {
  Listener, ListenerOptions, UserError, PieceContext
} from '@sapphire/framework';

export default class CommandDeniedListener extends Listener {
  constructor(context: PieceContext, options?: ListenerOptions) {
    super(context, {
      ...options,
      event: 'commandDenied'
    });
  }

  async run(
    error: UserError,
    { message, interaction }: CommandEventPayload
  ) {
    if (interaction) {
      replyInteraction(interaction, {
        content: error.message
      });
    } else if (message) {
      message.reply(error.message);
    }
  }
}
