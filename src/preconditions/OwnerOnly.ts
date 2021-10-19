import config from '@/config';
import UserInteraction from '@/types/UserInteraction';
import { Precondition } from '@sapphire/framework';
import { Message } from 'discord.js';

export default class OwnerOnly extends Precondition {
  run(message: Message) {
    return this.check(message.author.id);
  }

  runSlash(interaction: UserInteraction) {
    return this.check(interaction.user.id);
  }

  check(id: string) {
    const isOwner = config.owners.includes(id);
    return isOwner ? this.ok() : this.error({
      message: 'Only my masters are allowed to execute this command.',
      identifier: 'ownerOnly'
    });
  }
}
