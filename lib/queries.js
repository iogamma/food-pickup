
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


  getMenuItems: (restaurantId, done) => {
    db.select().from('items').where({restaurant_id: restaurantId}).then(done);
  },
// --------

// we are returning the id so might need nother spot in the callback function on the

  //retrieve all data from items and items_orders
  retrieveAllData: (restaurantId, orderId, done) => {
    db.select('items.id', 'quantity', 'description', 'image', 'name', 'price')
    .from(function() {
      this.as('currentOrder').from('items_orders').where({order_id:orderId})
    })
    .fullOuterJoin('items','currentOrder.item_id','items.id')
    .where({restaurant_id:restaurantId})
    .then(done);
  },

  //retrieve delivery time after an order is placed
  retrieveReadyTime: (userId, done) => {
    db.select('ready_time')
      .from('orders')
      .where({user_id:userId})
      .andWhere({status:null})
      .returning('ready_time').then(done);
  },

  // retrieve order id
  retrieveOrderId: (userId, done) => {
    db.select('id')
      .from('orders')
      .where({user_id:userId})
      .andWhere({status:null})
      .returning('id').then(done);
  },

  retrieveData: (orderId, done) => {
    db.select('quantity','name','price')
      .from('items_orders')
      .leftOuterJoin('items','items_orders.item_id','items.id')
      .where({order_id:orderId})
      .then(done);
  },

  //check order status and insert new order
  insertNewOrder: (userId, done) => {
    db.select('id')
      .from('orders')
      .where({user_id:userId})
      .andWhere({status:null})
      .then((rows) => {
        if (!rows.length) {
          db.insert({user_id:userId}).into('orders').then(done);
        }
      })
  },

  //update the status of current order to "placed"
  updateCurrentOrder: (userId, newStatus, done) => {
    console.log(userId);
    console.log(newStatus);
    db.select('id').from('orders')
                  .where({id:userId})
                  .andWhere({status:null})
                  .update({status: newStatus, time_of_order:new Date()})
                  .then(done);
  },

  //create a new current order after previous current order is "placed"
  createNewOrder: (userId, done)=> {
     db.insert({user_id:userId, status:null}).into('orders').then(done);
  },

  //decide whether to insert items or update quantity
  insertOrUpdate:(itemId, currentOrder, itemQuantity, done) => {
    db.select('id')
      .from('items_orders')
      .where({item_id:itemId})
      .andWhere({order_id:currentOrder})
      .then((rows) => {
        if (rows.length) {
          db.select('quantity').from('items_orders').where({item_id:itemId}).andWhere({order_id:currentOrder}).update('quantity', itemQuantity ).then(done)
          // rows[0].update('quantity', itemQuantity ).then(done)
        } else {
          db.insert({order_id:currentOrder, item_id:itemId, quantity:itemQuantity}).into('items_orders').then(done)
        }
      })
  },


  // find order id of current order (not placed)
  findCurrentOrder: (userId, done) => {
    db.select('id').from('orders').where({user_id:userId}).andWhere({status:null}).then(done);
    // db.select('id').from('orders').where({user_id:userId}).then(done);
  },

  // createNewToOrder:   (userId, done)=> {
  //   db.insert({user_id:userId, time_of_order:new Date()}).into('orders').returning('id').then(done);
  // },

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
    status:'confirmed'
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
