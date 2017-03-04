const express       = require('express');
const itemsRoutes  = express.Router();
const cookieSession = require('cookie-session');

itemsRoutes.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

module.exports = function(DataHelpers) {


// All the GET routes

// List of restaurants

itemsRoutes.get("/restaurants", function(req, res) {

  DataHelpers.getAllRestaurants((restaurants) => {

    console.log(restaurants)


    res.render("index.ejs",restaurants);

    });


  });

// login and set user cookie
itemsRoutes.get("/login/:id", function(req, res) {
  //TODO: Get username from query string
  let usersId = req.params.id;
  //TODO: Assign a cookie session
  if (usersid < 3) {
    req.session.user_id = usersId;
  }
  res.redirect('/');
});

// Load the menu of the chosen restaurant
itemsRoutes.get("/restaurants/:id", (req, res) => {

// In case of EJS so I can use :id and know the Restaurant name
//       let restaurantid = req.params.id;
// In case of AJAX so I get the restaurant id from the client
//      let restaurantid = req.body.id;

  let restaurantId = req.params.id;

  DataHelpers.getMenueItems(restaurantId, (menuitems) => {

    console.log(menuitems)
// res.send("<html><body>Welcome to this sepcific restaurant<b>!!!</b></body></html>\n");
    res.render("menu_orders.ejs", menuitems);
    });

});

// Ajax to keep checking the status of the cart and display
itemsRoutes.get("/cart", function(req, res) {
res.render("menu_orders.ejs");


});

// user gets updates on the delivary time
itemsRoutes.get("/order", function(req, res) {
  res.render("confirmation.ejs");
  res.send("<html><body>wait here to get delivary status<b>!!!</b></body></html>\n");
  res.status(200);
});


// owner to get the new order

itemsRoutes.get("/restaurants/:restaurants_id/orders", function(req, res) {

    let restaurantId = req.params.restaurants_id;

    DataHelpers.ownerOrders(restaurantId, (orders) => {

    console.log(orders)
res.send("<html><body>order with status submitted<b>!!!</b></body></html>\n");

    });


});

// owner to get the queued orders
itemsRoutes.get("/restaurants/:restaurants_id/queue", function(req, res) {
  res.render("owner.ejs");
  res.status(200);
});


// Event listeners and uodating items before submission
itemsRoutes.post("/cart/:items_id", function(req, res) {

  res.status(200);

        // find user id from session :


        // if the id is sent correcty to /:items_id
        // let itemid = req.params.id;
        // or if the itemid comes in the body
        //   let itemid = req.body.id

        // if the quantity of the order
        // let itemQuantity = req.body.quantity;

        //We check if order Id exist

        // if(!req.session.order_id) {

       // DataHelpers.createNewToOrder(restaurantId, (menuitems) => {

        //});



        //} else {
        // if exists then we need to create a new order row + retriving the id that is chosen and either send it in a session or send it to

        //  1- creat new order

        //   DataHelpers.creatOrder(userid, itemid, itemQuantity, (err, items) =>{


        //         DataHelpers.InsertNewToOrders(userid, itemid, itemQuantity, (err, items) =>{


        //         console.log(items)
        //         res.send("<html><body>bye <b>World</b></body></html>\n");

        //            }

  });

// here we get a boolean that shows if the order has been submitted
itemsRoutes.post("/order", function(req, res) {
  res.redirect("/order");


});

// Owner submites delivary time
itemsRoutes.post("/restaurants/:restaurants_id/pickup", function(req, res) {

res.status(200);


});

// login and set user cookie
itemsRoutes.post("/login", function(req, res) {

res.status(200);


});









    return itemsRoutes;

};