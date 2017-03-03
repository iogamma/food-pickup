
exports.up = function(knex, Promise) {
  return knex.schema.createTable("carts", (table) => {
  	table.increments();
  	table.integer('order_id').unsigned()
    table.foreign('order_id').references("orders.id").onDelete('cascade');
  	table.integer('item_id').unsigned()
    table.foreign('item_id').references("items.id").onDelete('cascade');
  	table.integer('quantity');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('carts');
};