import knex from 'knex';

let dev = process.env.DEV || false;

let options = {
  DEV: dev,
  PORT: process.env.PORT || 3001,
  ROOT: __dirname.replace('dist/config', '/'),
  PUBLIC: __dirname.replace('dist/config', '/public')
};

const db = knex({
  client: 'mysql',
  connection: {
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'rgxp',
    charset   : 'utf8',
  }
});

export default {
  options,
  db
}
