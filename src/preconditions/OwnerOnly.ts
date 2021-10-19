import config from '@/config';
import { Precondition, UserError } from '@sapphire/framework';
import { Message } from 'discord.js';

export default class OwnerOnly extends Precondition {
  run(message: Message) {
    const isOwner = config.owners.includes(message.author.id);
    return isOwner ? this.ok() : this.error(new UserError({
      message: 'Only my masters are allowed to execute this command.',
      identifier: 'ownerOnly'
    }));
  }
}
