import SlashCommand from '@/lib/structures/slashCommandPiece';
import { Command } from '@sapphire/framework';
import { Message } from 'discord.js';
import UserInteraction from './userInteraction';

export default interface CommandEventPayload {
  command: Command | SlashCommand;
  interaction?: UserInteraction;
  message?: Message;
}
