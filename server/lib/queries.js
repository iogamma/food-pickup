module.exports = function queriesAndFunctions(db) {
  return {


  getMenueItemsBasic: function() {


       console.log(db)


    },
// --------
  // getMenueItems: (restaurantId, callback)=>  {

  //     db.knex.select("items.id","items.description","items.name","items.price").from("items").where({'restaurant_id': restaurantId }).asCallback(function(err, values) {
  //       if(err) {
  //         console.log(err);
  //       } else {
  //         console.log(values);
  //       }
  //            console.log(db.Menu.menueItems)
  //   },


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
