
//const settings = require("../settings");

// const knex = require('knex')({
//   client: settings.client,
//   connection: {
//     host : settings.hostname,
//     user : settings.user,
//     password : settings.password,
//     database : settings.database,
//     port: settings.port,
//     ssl: settings.ssl
//   }
// });

// module.exports = knex;

module.exports = function queriesAndFunctions(db) {
  return {


  getMenueItems: (restaurantId, done) => {
    db.select().from('items').where({restaurant_id: restaurantId}).then(done);
  },
// --------

// we are returning the id so might need nother spot in the callback function on the
  createNewToOrder:   (userid, done)=> {
    db.insert({user_id:userid }).returning('id').into('order').then(done);
  },

  updateCart:   (itemId, ItemQuantity, orderId, done)=> {
   // knex.insert({user_id:userid }).returning('id').into('order').then(done);
   db("items_orders").where({
    item_id:itemId,
    order_id: orderId
    }).update({quantity: ItemQuantity}).then(done);

  },

  insertNewToCart:   (itemId, ItemQuantity, orderId, done)=> {
    db.insert({

    item_id:itemId,
    order_id: orderId,
    quantity: ItemQuantity,

    }).into('items_orders').then(done);

  },

  allCartCurrentItems: (orderId, done) => {
    db.select().from('items_orders').where({order_id: orderId}).then(done);
  },

  submitted: (orderId, done)=> {
   // knex.insert({user_id:userid }).returning('id').into('order').then(done);
   db("orders").where({
    item_id:itemId,
    order_id: orderId
    }).update({quantity: ItemQuantity}).then(done);

  },

  ownerOrders: (restaurantId, done) => {
    db.select('items_orders.order_id', 'items_orders.quantity', 'users.username','users.phone_number', 'orders.status','items.name','orders.ready_time')
    .from('users')
    .leftOuterJoin('orders', 'users.id', 'orders.user_id')
    .leftOuterJoin('items_orders', 'orders.id', 'items_orders.order_id')
    .leftOuterJoin('items', 'items_orders.item_id', 'items.id')

    .where({status:"placed"}).orWhere({status:"confirmed"}).then(done);

  },

  getAllRestaurants: (done) => {
    db.select('id','name').from('restaurants').then(done);
  },

  updateDelivaryTime: (orderId,delivaytime, done)=> {
   // knex.insert({user_id:userid }).returning('id').into('order').then(done);
   db("orders").where({
    id: orderId
    }).update({
    ready_time: delivaytime,
    status:'placed'
    }).then(done);

  },

  updateCompleted: (orderId, done)=> {
   // knex.insert({user_id:userid }).returning('id').into('order').then(done);
   db("orders").where({
    id: orderId
    }).update({
    status:'completed'
    }).then(done);

  },






    };
}
