import { Config } from '@/config';
import {
  container, PreconditionResult, SapphireClient, Store
} from '@sapphire/framework';
import SlashCommandStore from './structures/SlashCommandStore';
import SchedulerStore from './structures/SchedulerStore';
import UserInteraction from '@/types/UserInteraction';

export default class Client extends SapphireClient {
  constructor(options: Config) {
    super(options);

    container.stores.register(new SlashCommandStore());
    container.stores.register(new SchedulerStore());

    if (options.debug) Store.defaultStrategy.onLoad = (store, piece) => this.logger.info(`Loading ${store.name}:${piece.name}`);
  }
}

declare module '@sapphire/pieces' {
  export interface StoreRegistryEntries {
    slashCommands: SlashCommandStore;
    schedulers: SchedulerStore;
  }
}

declare module '@sapphire/framework' {
  interface Preconditions {
    OwnerOnly: never;
  }

  export interface Precondition {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,no-unused-vars
    runSlash(interaction: UserInteraction): PreconditionResult;
  }
}
