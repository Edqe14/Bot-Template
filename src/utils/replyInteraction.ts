import UserInteraction from '@/types/UserInteraction';
import {
  MessagePayload,
  WebhookEditMessageOptions,
  InteractionReplyOptions
} from 'discord.js';

const replyInteraction = (
  interaction: UserInteraction,
  options: string | MessagePayload | WebhookEditMessageOptions | InteractionReplyOptions
) => {
  if (interaction.replied) return interaction.followUp(options);
  if (interaction.deferred) return interaction.editReply(options);
  return interaction.reply(options);
};

export default replyInteraction;
