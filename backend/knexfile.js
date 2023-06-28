const { mysqlConect } = require("./.env")

module.exports = {
  client: 'mysql2',
  connection: mysqlConect,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
