import { Utils, Log } from '../build/module/index';
// import { Logger } from '../build/module/lib/logger';
import consola from 'consola';

console.log(!Utils.isBrowser);
console.log(Utils.isGlobalPresent('konsole'));
global.konsole = consola;
// global.konsole = new Log();
console.log(Utils.isGlobalPresent('konsole'));
// console.log(global);
konsole.log('log statement', 'l');
konsole.debug('debug statement', 'd', { a: 45 });
konsole.info('info statement');
konsole.error('error statement');
konsole.error('hello', 'a', { t: 45 });
