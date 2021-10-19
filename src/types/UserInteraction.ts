import {
  ButtonInteraction,
  CommandInteraction,
  ContextMenuInteraction,
  MessageComponentInteraction,
  SelectMenuInteraction
} from 'discord.js';

type UserInteraction = ButtonInteraction
  | CommandInteraction
  | SelectMenuInteraction
  | ContextMenuInteraction
  | MessageComponentInteraction;

export default UserInteraction;
