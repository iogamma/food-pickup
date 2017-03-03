const express       = require('express');
const itemsRoutes  = express.Router();

module.exports = function(DataHelpers) {

 itemsRoutes.get("/", function(req, res) {

        res.render("index.ejs");
  });

itemsRoutes.get("/hello", (req, res) => {
  DataHelpers.getMenueItemsBasic(function(db){console.log(db)});
  res.send("<html><body>Hello <b>World</b></body></html>\n");

});


// itemsRoutes.get("/:id",function(req, res) {

//      // I case of EJS so I can use :id and know the Restaurant name
//       let restaurantid = req.params.id;
//       // I case of AJAX so I get the restaurant id from the client
//       // let restaurantid = req.body.id;
//     DataHelpers.getMenueItems(restaurantid, (err, items) =>{

//           console.log(items)
//           res.send("<html><body>bye <b>World</b></body></html>\n");

//        })
//   });


// itemsRoutes.POST("/cart/:items_id", function(req, res) {

      // find user id from session :


      // if the id is sent correcty to /:items_id
        // let itemid = req.params.id;
      // or if the itemid comes in the body
      //   let itemid = req.body.id

      // if the quantity of the order
        // let itemQuantity = req.body.quantity;

//We check if order Id exist

      // if(!req.session.order_id) {
      //   knex('restaurantdb')
      //   .insert({
      //     user_id:req.session.user_id,
      //     time_of_order:new Date()
      //   })





      //} else {
// if exists then we need to create a new order row + retriving the id that is chosen and either send it in a session or send it to

//  1- creat new order

  //   DataHelpers.creatOrder(userid, itemid, itemQuantity, (err, items) =>{


  //         DataHelpers.InsertNewToOrders(userid, itemid, itemQuantity, (err, items) =>{


  //         console.log(items)
  //         res.send("<html><body>bye <b>World</b></body></html>\n");

  //            }
  //        });







  //      // }



  // });












    return itemsRoutes;

};