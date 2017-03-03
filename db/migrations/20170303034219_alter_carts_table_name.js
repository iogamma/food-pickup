exports.up = function(knex, Promise) {
  return knex.schema.renameTable('carts', 'items_orders')
}

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('items_orders', 'carts')
}
