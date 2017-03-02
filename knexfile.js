// Update with your config settings.
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'restaurantdb',
      user:     'development',
      password: 'development'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
