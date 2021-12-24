/* eslint-disable class-methods-use-this */
/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-return-void */
import { Logger } from './logger';

export default class Log implements Logger {
  public debug(...args: any[]): void {
    this.consoleLog('debug', args);
  }
  public info(...args: any[]): void {
    this.consoleLog('info', args);
  }
  public error(...args: any[]): void {
    this.consoleLog('error', args);
  }
  public log(...args: any[]): void {
    this.consoleLog('log', args);
  }
  private consoleLog(type: 'debug' | 'info' | 'error' | 'log', args: any[]) {
    if (!args || args.length === 0) return;
    // const debug = this._logLevel || 2;
    const message = args.shift();
    if (args.length > 0) {
      console[type](message, ...args);
    } else {
      console[type](message);
    }
  }
}
