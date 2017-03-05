exports.seed = function(knex, Promise) {
      return Promise.all([
        knex('orders').del(),
        knex('items_orders').del(),
        ])
        .then(() => {  
          return knex('orders').insert({user_id:1, time_of_order:new Date()})
          .returning('id').then(function(ids) {
            return Promise.all([
              knex('items_orders').insert({order_id: ids[0], item_id:1, quantity:1}),
              knex('items_orders').insert({order_id: ids[0], item_id:3, quantity:2}),
              knex('items_orders').insert({order_id: ids[0], item_id:5, quantity:3}) 
            ])
          })
        }).then(() => {
          return knex('orders').insert({user_id:2, time_of_order:new Date(), status:'placed'})
          .returning('id').then(function(ids) {
            return Promise.all([
              knex('items_orders').insert({order_id: ids[0], item_id:2, quantity:2}),
              knex('items_orders').insert({order_id: ids[0], item_id:4, quantity:1}),
              knex('items_orders').insert({order_id: ids[0], item_id:6, quantity:3})  
            ])
          })
        }).then(() => {
		      return knex('orders').insert({user_id:1, time_of_order:new Date(), ready_time: 15, status:'placed'})
		      .returning('id').then(function(ids) {
		        return Promise.all([
		          knex('items_orders').insert({order_id: ids[0], item_id:1, quantity:2})
		        ])
		      })
        }).then(() => {})
};

