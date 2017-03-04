const express       = require('express');
const itemsRoutes  = express.Router();
//var groupArray = require('group-array');

// Twilio Credentials
var accountSid = 'AC8fdabc7d09216813636cc2828fbcb42a';
var authToken = 'e2388f2a457ca51d5afbf02d90def812';

var twilio = require('twilio');
var Client = new twilio.RestClient(accountSid, authToken);
//require the Twilio module and create a REST client
// var client = new require('twilio').RestClient(accountSid, authToken);

module.exports = function(DataHelpers) {


// All the GET routes

// List of restaurants

 itemsRoutes.get("/restaurants", function(req, res) {

  DataHelpers.getAllRestaurants((restaurants) => {

    console.log(restaurants)


    res.render("owner.ejs",restaurants);

    });


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
res.send("<html><body>Welcome to this sepcific restaurant<b>!!!</b></body></html>\n");

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
 // Get userId from query string
 const restaurantId = req.params.restaurants_id;
 // Assign a cookie session
 req.session.user_id = restaurantId;
 DataHelpers.ownerOrders(restaurantId, (orders) => {
   let templateVars = {};
   templateVars = {
     myOrders: orders,
     userId:   restaurantId
   }
   console.log(templateVars)
   res.render("owner.ejs", templateVars);
   res.status(200);
 });
});


// Event listeners and uodating items before submission
itemsRoutes.post("/cart/:items_id", function(req, res) {

  res.status(200);


});

// here we get a boolean that shows if the order has been submitted
itemsRoutes.post("/order", function(req, res) {

res.status(200);


});

// Owner submites delivary time
itemsRoutes.post("/restaurants/:restaurants_id/pickup", function(req, res) {

  let tempOrderId = 2;
  let tempDeliveryTime = null;

  DataHelpers.updateDelivaryTime(tempOrderId,tempDeliveryTime,(updates) => {

    console.log("data updated!")
    res.status(200);

  });


});

// Owner submites completed item
itemsRoutes.post("/restaurants/:restaurants_id/completed", function(req, res) {




});

// login and set user cookie
itemsRoutes.post("/login", function(req, res) {

res.status(200);


});

// nima testing route
itemsRoutes.get("/update", function(req, res) {

    let tempOrderId = 2;
    let tempDeliveryTime = null;

        DataHelpers.updateDelivaryTime(tempOrderId,tempDeliveryTime,(updates) => {

            console.log("data updated!")
            res.status(200);

        });

});
// practicing twilio
itemsRoutes.get("/twilio", function(req, res) {

  let deliveryTime = '15 min'

Client.messages.create({
    to: "+17788836554",
    from: "+17786540355",
    body: deliveryTime,
}, function(err, message) {
    if (err) {
        console.error('twilio error', err.message)
        return;
    }
    console.log(message.sid);
});

res.send("<html><body>twilio page<b>!!!</b></body></html>\n");

});







    return itemsRoutes;

};