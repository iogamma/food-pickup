
const settings = require("../settings");

const knex = require('knex')({
  client: settings.client,
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

module.exports = knex;




module.exports = function queriesAndFunctions(db) {
  return {


  getMenueItems: (restaurantId, done) => {
    knex.select().from('items').where({restaurant_id: restaurantId}).then(done);
  },
// --------

// we are returning the id so might need nother spot in the callback function on the
  createNewToOrder:   (userid, done)=> {
    knex.insert({user_id:userid }).returning('id').into('order').then(done);
  },

  updateCart:   (itemId, ItemQuantity, orderId, done)=> {
   // knex.insert({user_id:userid }).returning('id').into('order').then(done);
   knex("items_orders").where({
    item_id:itemId,
    order_id: orderId
    }).update({quantity: ItemQuantity}).then(done);

  },


















    };
}
