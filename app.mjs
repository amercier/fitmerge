import util from 'util';
import Server from './lib/Server';
import { settings } from './config';

const { promisify } = util;

(async () => {
  const server = new Server(settings);
  await server.start();

  const on = promisify((...args) => process.on(...args));
  on('SIGTERM', async () => server.stop());
  on('SIGINT', async () => server.stop());
})();
