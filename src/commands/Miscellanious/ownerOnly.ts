import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptions, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
  aliases: ['ownerOnly'],
  description: 'Example ownerOnly',
  preconditions: ['OwnerOnly']
})
export default class ExampleOwnerCommand extends Command {
  async run(message: Message) {
    return message.reply('Hey!');
  }
}
