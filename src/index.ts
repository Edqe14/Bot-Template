import { join } from 'path';
import dotenv from 'dotenv';
import Client from './modules/client';
dotenv.config({ path: join(__dirname, '.env') });

import config from './config';

export default new Client(config).start();
