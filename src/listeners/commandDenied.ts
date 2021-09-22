import CommandEventPayload from '@/types/CommandEventPayload';
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
    { message }: CommandEventPayload
  ) {
    return message.reply(error.message);
  }
}
