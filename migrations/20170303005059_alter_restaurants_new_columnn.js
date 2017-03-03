
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('restaurants', function(t) {
 	  t.string('name')
});
};

exports.down = function(knex, Promise) {
   return knex.schema.alterTable('restaurants', function(t) {
   t.dropColumn('name');
});
};