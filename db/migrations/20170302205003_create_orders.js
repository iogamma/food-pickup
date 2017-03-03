exports.up = function(knex, Promise) {
  return knex.schema.createTable("orders", (table) => {
  	table.increments();
  	table.integer('user_id').unsigned()
    table.foreign('user_id').references("users.id").onDelete('cascade');
  	table.string('username');
  	table.date('time_stamp');
  	table.integer('delivery_time');
  	table.string('status')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('orders');
};
