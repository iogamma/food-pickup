module.exports = function queriesAndFunctions(db) {
  return {
    // retrieve quantity and name for items of placed order
    retrieveOrderItems: (userId, done) => {
      db.select('quantity', 'name')
        .from(function(){
         this.as('recentOrder')
             .from('orders')
             .where({user_id:userId})
             .andWhere({status:"placed"})
             .orderBy('orders.id','desc')
             .limit(1)
        }).leftOuterJoin('items_orders', 'recentOrder.id','items_orders.order_id')
          .leftOuterJoin('items','items_orders.item_id','items.id')
          .then(done);
    },

    // retrieve data related to menu information and quanity of each items for the specified user
    retrieveMenuData: (restaurantId, orderId, done) => {
      db.select('items.id', 'quantity', 'description', 'image', 'name', 'price')
        .from(function() {
          this.as('currentOrder')
              .from('items_orders')
              .where({order_id:orderId})
        }).fullOuterJoin('items','currentOrder.item_id','items.id')
          .where({restaurant_id:restaurantId})
          .then(done);
    },

    //retrieve delivery time after an order is placed
    retrieveReadyTime: (userId, done) => {
      db.select('ready_time')
        .from('orders')
        .where({user_id:userId})
        .whereNotNull("status")
        .orderBy('id', 'desc')
        .limit(1)
        .returning('ready_time').then(done);
    },

    // retrieve order id of the current order
    retrieveOrderId: (userId, done) => {
      db.select('id')
        .from('orders')
        .where({user_id:userId})
        .andWhere({status:null})
        .returning('id').then(done);
    },

    // retrieve all relevant data for the order summary
    retrieveSummaryData: (orderId, done) => {
      db.select('quantity','name','price')
        .from('items_orders')
        .leftOuterJoin('items','items_orders.item_id','items.id')
        .where({order_id:orderId})
        .then(done);
    },

    //check order status and insert new order if status is null
    insertNewOrder: (userId, done) => {
      db.select('id')
        .from('orders')
        .where({user_id:userId})
        .andWhere({status:null})
        .then((rows) => {
          if (!rows.length) {
            db.insert({user_id:userId,})
              .into('orders')
              .then(done);
          }
        })
    },

    //update the status of current order to "placed"
    updateCurrentOrder: (userId, newStatus, done) => {
      db.select('status')
        .from('orders')
        .where({user_id:userId})
        .andWhere({status:null})
        .update({status: newStatus, time_of_order:new Date()})
        .then(done);
    },

    //create a new current order after previous current order is "placed"
    createNewOrder: (userId, done) => {
       db.insert({user_id:userId})
         .into('orders')
         .then(done);
    },

    //decide whether to insert new item or update quantity
    insertOrUpdate: (itemId, currentOrder, itemQuantity, done) => {
      db.select('id')
        .from('items_orders')
        .where({item_id:itemId})
        .andWhere({order_id:currentOrder})
        .then((rows) => {
          if (rows.length) {
            db.select('quantity')
              .from('items_orders')
              .where({item_id:itemId})
              .andWhere({order_id:currentOrder})
              .update('quantity', itemQuantity )
              .then(done)
          } else {
            db.insert({order_id:currentOrder, item_id:itemId, quantity:itemQuantity})
              .into('items_orders')
              .then(done)
          }
        })
    },

    // get data for owners' orders
    ownerOrders: (restaurantId, done) => {
      db.select('items_orders.order_id', 'items_orders.quantity', 'users.username','users.phone_number', 'orders.status','items.name','orders.ready_time')
      .from('users')
      .leftOuterJoin('orders', 'users.id', 'orders.user_id')
      .leftOuterJoin('items_orders', 'orders.id', 'items_orders.order_id')
      .leftOuterJoin('items', 'items_orders.item_id', 'items.id')
      .where({status:"placed", restaurant_id:restaurantId})
      .orWhere({status:"confirmed"})
      .then(done);
    },

    //get id and name for all restaurants
    getAllRestaurants: (done) => {
      db.select('id','name')
        .from('restaurants')
        .then(done);
    },

    updateDelivaryTime: (orderId,delivaytime, done) => {
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
