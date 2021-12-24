/* eslint-disable dot-notation */
import Service from '../service';

declare let global;
global.konsole = console;
const svc = new Service('https://reqres.in/api');

test('service configs', () => {
  svc.setCache(1, true);
  svc.setHeaders({});
  svc.setParams({ page: 1 });
});

test('service get', async () => {
  const resp = await svc.get('/users');
  expect(resp.data).toBeDefined();
  expect(resp.data['page']).toBe(1);
});

test('service get [from cache]', async () => {
  const resp = await svc.get('/users');
  expect(resp.data).toBeDefined();
  expect(resp.data['page']).toBe(1);
});
