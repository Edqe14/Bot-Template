import { ApplyOptions } from '@sapphire/decorators';
import { CommandOptions, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
  aliases: ['example'],
  description: 'Example'
})
export default class ExampleCommand extends Command {
  async messageRun(message: Message) {
    message.reply('Hey!');
  }
}
