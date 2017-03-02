
exports.up = function(knex, Promise) {
  return knex.schema.createTable("restaurants", (table) => {
  	table.increments();
  	table.integer('item_id').unsigned()
    table.foreign('item_id').references("items.id").onDelete('cascade');
  	table.string('username');
  	table.string('password');
  	table.string('location');
  	table.string('phone_number');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('restaurants');
};