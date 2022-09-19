import { Command } from '@sapphire/framework';
import { Message } from 'discord.js';
import SlashCommand from '@/lib/structures/slashCommandPiece';
import UserInteraction from './userInteraction';

export default interface CommandEventPayload {
  command: Command | SlashCommand;
  interaction?: UserInteraction;
  message?: Message;
}
