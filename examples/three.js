import Service from '../build/module/lib/service.js';
import RS from 'ramdasauce';
import consola from 'consola';

const logger = consola.create({
  level: 4,
});
global.konsole = logger;
const svc = new Service('https://reqres.in/api');
svc.setCache(2, true);
svc
  .get('/users', {
    page: 1,
  })
  .then(RS.dotPath('data'))
  .then((response) => {
    console.log(response);
    svc
      .get('/users', {
        page: 2,
      })
      .then(RS.dotPath('data'))
      .then(console.log);
    svc
      .get('/users', {
        page: 1,
      })
      .then(RS.dotPath('data'))
      .then(console.log);
  });
