
exports.up = function(knex, Promise) {
  return knex.schema.createTable("items", (table) => {
  	table.increments();
  	table.string('description');
  	table.string('image');
  	table.string('name');
  	table.integer('price')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('items');
};
