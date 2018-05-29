import express from 'express';

/**
 * Run a function inside a Promise containing a try/catch block.
 * @param {Function} fn Function that receive `resolve` as only parameter.
 */
function tryAsync(fn) {
  return new Promise((resolve, reject) => {
    try {
      fn(resolve);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * An Express server that serves Fitmerge API and static files
 */
export default class {
  /**
   * Create a server instance. Use `#start()` to start the server.
   * @param {Object} settings Server settings
   */
  constructor(settings) {
    this.settings = settings;
    this.app = express();
  }

  /**
   * Log a message to the configured console
   */
  log(...args) {
    this.settings.console.log(...args);
  }

  /**
   * Start the server.
   */
  async start() {
    if (this.server) {
      throw new Error('Server is already started.');
    }
    const { port, host } = this.settings;
    this.server = await tryAsync((resolve) => {
      const server = this.app.listen(port, host, () => resolve(server));
    });
    this.log(`Listening on ${host}:${port}`);
  }

  /**
   * Stop the server.
   */
  async stop() {
    if (this.server) {
      await tryAsync(resolve => this.server.close(resolve));
      this.log('Stopped listening');
    }
  }

  /**
   * Stop the server if it is started, and start it again.
   */
  async restart() {
    await this.stop();
    await this.start();
  }
}
