
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('orders', function(t) {
   t.timestamp('time_stamp').alter(); 
});
};

exports.down = function(knex, Promise) {
   return knex.schema.alterTable('orders', function(t) {
   t.date('time_stamp').alter(); 
});
};
