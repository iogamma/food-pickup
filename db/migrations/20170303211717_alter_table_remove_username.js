
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('orders', function(t) {
    t.dropColumn('username');
  });
};

exports.down = function(knex, Promise) {
   return knex.schema.alterTable('orders', function(t) {
 	  t.string('username');
  });
};