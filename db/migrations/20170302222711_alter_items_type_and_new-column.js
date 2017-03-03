
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('items', function(t) {
    t.float('price').alter(); 
 	  t.integer('restaurant_id').unsigned()
    t.foreign('restaurant_id').references("restaurants.id").onDelete('cascade');
});
};

exports.down = function(knex, Promise) {
   return knex.schema.alterTable('items', function(t) {
   t.integer('price').alter();
   t.dropColumn('restaurant_id');
});
};