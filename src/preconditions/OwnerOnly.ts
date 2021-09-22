import config from '@/config';
import {
  err, ok, Precondition, UserError
} from '@sapphire/framework';
import { Message } from 'discord.js';

export default class OwnerOnly extends Precondition {
  run(message: Message) {
    const isOwner = config.owners.includes(message.author.id);
    return isOwner ? ok() : err(new UserError({
      message: 'Only my masters are allowed to execute this command.',
      identifier: 'ownerOnly'
    }));
  }
}
