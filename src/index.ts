import Client from './lib/client';
import { TOKEN, CLIENT_CONFIG } from './config';

const client = new Client(CLIENT_CONFIG);
client.login(TOKEN);

export default client;
