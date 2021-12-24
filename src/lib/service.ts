import { ApisauceInstance, create, HEADERS } from 'apisauce';
import LRUCache from 'mnemonist/lru-cache';

import { Logger } from './logger';
import * as Utils from './utils';

declare let konsole: Logger;

export default class Service {
  _url: string;
  _api: ApisauceInstance;
  _params: Record<string, unknown> = null;
  _cache: LRUCache<string, string> = null;
  _keyHashed = false;

  constructor(baseUrl: string, headers: HEADERS = null) {
    this._url = baseUrl;
    konsole.info(`Service [create] ${this._url}`);
    this._api = create({
      baseURL: baseUrl,
      headers,
    });
    // attach a monitor that fires with each request
    // this._api.addRequestTransform((request) => {
    //   console.log('******** request sent *******', request);
    // });
    // change the get fn
    const originalGet = this._api.get;
    this.api.get = (url, params = {}) => {
      return new Promise((resolve) => {
        const path = url + JSON.stringify(params);
        const key = this._getKey(path);
        // console.log('***** inside modified get ******');
        if (this._cache.has(key)) {
          const val = this._cache.get(key);
          const data = JSON.parse(val);
          konsole.debug(`Service [CACHE HIT] ${key} ${val}`);
          return resolve({
            ok: true,
            problem: null,
            originalError: null,
            data,
          });
        }
        return resolve(originalGet(url, params));
      });
    };

    this.api.addResponseTransform((response) => {
      konsole.debug(
        `Service [respone] ok: ${response.ok}, problem: ${response.problem}, error:`,
        response.originalError
      );
      // lets add the result to cache
      if (this._cache && response.ok) {
        const path =
          response.config.url + JSON.stringify(response.config.params);
        const key = this._getKey(path);
        const val = JSON.stringify(response.data);
        konsole.debug(`Service [CACHE] ${key} ${val}`);
        this._cache.set(key, val);
      }
    });
  }

  _getKey(path: string): string {
    return this._keyHashed ? Utils.hash(path).toString() : path;
  }

  setCache(limit: number, keyAsHash = false) {
    // this._cache = new LRU({
    //   max: limit,
    //   dispose(key, n) {
    //     console.log('======= dispose ==== ');
    //     console.log(key);
    //     console.log(n);
    //     // n.close();
    //   },
    //   maxAgeit: 1000 * 60 * 60,
    // });
    konsole.info(`Service [setup] cache limit ${limit}`);
    this._cache = new LRUCache(limit);
    this._keyHashed = keyAsHash;
  }

  setHeaders(headers: HEADERS) {
    konsole.info(`Service [setup] headers`, headers);
    this.api.setHeaders(headers);
  }

  setParams(params: Record<string, unknown>) {
    konsole.info(`Service [setup] params`, params);
    this._params = params;
  }

  get api(): ApisauceInstance {
    return this._api;
  }

  get(path = '/', params: Record<string, unknown> = null) {
    const p = {
      ...this._params,
      ...params,
    };
    konsole.info(`Service [GET] path ${path} with params`, p);
    return this.api.get(path, p);
  }
}
