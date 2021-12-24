/* eslint-disable functional/prefer-type-literal */
/* eslint-disable functional/no-method-signature */
export interface Logger {
  debug(...params: any[]): void;
  info(...params: any[]): void;
  error(...params: any[]): void;
  log(...params: any[]): void;
}
