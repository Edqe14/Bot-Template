import { Config } from '@/config';
import { container, SapphireClient, Store } from '@sapphire/framework';
import SlashCommandStore from './structures/SlashCommandStore';

export default class Client extends SapphireClient {
  constructor(options: Config) {
    super(options);

    container.stores.register(new SlashCommandStore());

    Store.defaultStrategy.onLoad = (store, piece) => this.logger.info(`Loading ${store.name}:${piece.name}`);
  }
}

declare module '@sapphire/pieces' {
  export interface StoreRegistryEntries {
    slashCommands: SlashCommandStore;
  }
}
