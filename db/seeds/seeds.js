exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('items').del(),
    ]).then(() => {
      return Promise.all([
        knex('users').insert({username: 'John', password:'test', phone_number: '604-222-2222'}),
        knex('users').insert({username: 'Peter', password:'test', phone_number: '604-333-3333'})
        ])
    }).then(() => {
        return knex('restaurants').del().then(() => {
          return Promise.all([
            knex('restaurants').insert({username: 'Bob', password:'test', location: '128 W Hastings St #300, Vancouver, BC', phone_number: '604-123-4567', name:"Lighthouse Cafe"})
            .returning('id').then(function(ids) {
              return Promise.all([
                knex('items').insert({description: 'This is a sandwich', image: '/images/porchetta.jpg', name: 'Porchetta Sandwich', price: '8.50', restaurant_id:ids[0]}),
                knex('items').insert({description: 'This is another sandwich', image: '/images/chicken.jpg', name: 'Chicken Sandwich', price: '7.50', restaurant_id:ids[0]}),
                knex('items').insert({description: 'This is a salad', image: '/images/garden.jpg', name: 'Garden Salad', price: '6.50', restaurant_id:ids[0]}),
                knex('items').insert({description: 'This is another salad', image: '/images/caesar.jpg', name: 'Caesar Salad', price: '5.00', restaurant_id:ids[0]})
              ])
            }),
            knex('restaurants').insert({username: 'Tom', password:'test', location: '222 W Hastings St #300, Vancouver, BC', phone_number: '604-333-3333', name:"Cookies by Lighthouse"})
            .returning('id').then(function(ids) {
              return Promise.all([
                knex('items').insert({description: 'This is a cookie', image: '/images/chocolate.jpg', name: 'Chocolate Chips Cookie', price: '3.50', restaurant_id:ids[0]}),
                knex('items').insert({description: 'This is another cookie', image: '/images/butter.jpg', name: 'Peanut Butter Cookie', price: '2.50', restaurant_id:ids[0]}),
              ]);
            })
          ])
      });
    }).then(() => {})
};


