import { Command, CommandContext } from '@sapphire/framework';
import { Message } from 'discord.js';

export default interface CommandEventPayload {
  message: Message;
  command: Command;
  parameters: string;
  context: CommandContext;
}
