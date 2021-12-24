import Log from '../log';
import { Logger } from '../logger';

const konsole: Logger = new Log();

test('log - check with empty params', () => {
  konsole.log();
});
test('debug - check with one params', () => {
  konsole.debug('hello');
});
test('info - check with two params', () => {
  konsole.info({ t: 1 }, 'hello');
});
test('error - check with three params', () => {
  konsole.error('error msg', [1, 2, 3], 'hello');
});
