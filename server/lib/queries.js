
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
//   getMenueItems: (restaurantId, callback)=>  {

//       db.knex.select("items.id","items.description","items.name","items.price").from("items").where({'restaurant_id': restaurantId }).asCallback(function(err, values) {
//         if(err) {
//           console.log(err);
//         } else {
//           console.log(values);
//         }
//              console.log(db.Menu.menueItems)
//     });
// },

  //   InsertNewToOrders:   (userid, itemID, QuantityOfItem, callback)=> {

  //     knex('restaurantdb')insert({
  //     user_id: userid,
  //     long: data.long,
  //     user_id: data.user_id
  //   }).into('orders').then(done);
  //   },

  //   createUrl: (data, done) => {

  // },
















    };
}
