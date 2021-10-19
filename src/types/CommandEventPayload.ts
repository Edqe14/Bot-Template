import SlashCommand from '@/lib/structures/SlashCommandPiece';
import { Command } from '@sapphire/framework';
import { Message } from 'discord.js';
import UserInteraction from './UserInteraction';

export default interface CommandEventPayload {
  command: Command | SlashCommand;
  interaction?: UserInteraction;
  message?: Message;
}
