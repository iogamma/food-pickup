
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('orders', function(t) {
  	t.renameColumn("delivery_time", "ready_time");
  	t.renameColumn("time_stamp", "time_of_order");
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('orders', function(t) {
  	t.renameColumn("ready_time", "delivery_time");
  	t.renameColumn("time_of_order", "time_stamp");
  });
}
