
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('restaurants', function(t) {
    t.dropColumn('item_id');
});
};

exports.down = function(knex, Promise) {
   return knex.schema.alterTable('restaurants', function(t) {
 	  t.integer('item_id').unsigned()
    t.foreign('item_id').references("items.id").onDelete('cascade');
});
};