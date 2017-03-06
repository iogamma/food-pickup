//==================== Constants
const express       = require('express');
const cookieSession = require('cookie-session');
const util          = require('../lib/utils/helpers.js');
//const groupArray = require('group-array');
const itemsRoutes   = express.Router();
// Twilio Credentials
const accountSid = 'AC8fdabc7d09216813636cc2828fbcb42a';
const authToken = 'e2388f2a457ca51d5afbf02d90def812';
//require the Twilio module and create a REST client
// var client = new require('twilio').RestClient(accountSid, authToken);
const twilio = require('twilio');
const Client = new twilio.RestClient(accountSid, authToken);

//==================== Middleware Setup
itemsRoutes.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

//==================== Routes
module.exports = function(DataHelpers) {

  //========== GET Routes
  // Home page
  itemsRoutes.get('/', (req, res) => {
    res.redirect('/restaurants')
  });

  // List of restaurants page
  itemsRoutes.get("/restaurants", (req, res) => {
    DataHelpers.getAllRestaurants((restaurants) => {
      const templateVars = {
        userId      : req.session.user_id,
        restaurants : restaurants
      };

      res.render("index.ejs",templateVars);
    });
  });

  // login customer and set user cookie
  itemsRoutes.get("/login/c/:id", (req, res) => {
    // Get userId from query string
    const custId = req.params.id;
    // Assign a cookie session
    if (custId < 3) {
      req.session.user_id = custId;
    }
    DataHelpers.insertNewOrder(req.session.user_id, (value) => {
    });
    res.redirect('/restaurants');
  });

  itemsRoutes.post('/logout', (req, res) => {
    // Delete a cookie session
    if (req.session) {
      req.session = null;
    }
    res.redirect('/');
  });

  // Load the menu of the chosen restaurant
  itemsRoutes.get("/restaurants/:id", (req, res) => {
    const restaurantId = req.params.id;
    DataHelpers.retrieveOrderId(req.session.user_id, (value) => {
      const orderId = value[0].id;
      DataHelpers.retrieveAllData(restaurantId, orderId, (order) => {
        // //Calculate the totals for an order
        // menuItems.forEach((item) => {
        //   itemTotal = Number(item.quantity) * item.price;
        //   totals.subtotal += itemTotal;
        // })
        // totals.gst = totals.subtotal * 0.05;
        // totals.pst = totals.subtotal * 0.07;
        // totals.total = totals.subtotal + totals.gst + totals.pst;
        const totals = util.calOrderTotals(order);
        const templateVars = {
          userId        : req.session.user_id,
          restaurantId  : restaurantId,
          menuItems     : order,
          totals        : totals
        };
        res.render("menu_orders.ejs", templateVars);
      });
    });
  });
  //   // user gets updates on the delivery time

  // // Ajax to keep checking the status of the cart and display

  itemsRoutes.get("/cart/:id", (req, res) => {
    restaurant_id = req.params.id;
    DataHelpers.retrieveOrderId(req.session.user_id, (value) => {
      const orderId = value[0].id;
      DataHelpers.retrieveAllData(restaurant_id, orderId, (value) => {
        res.json(value);
      });
    });
  });

  // itemsRoutes.get("/login", (req, res) => {
  //   DataHelpers.insertNewOrder(req.session.user_id, (value) => {
  //     res.status(200);
  //   })
  // })

  // Modify database based on users changing quantity
  itemsRoutes.post("/cart/:items_id", (req, res) => {
    DataHelpers.findCurrentOrder(req.session.user_id, (value) => {
      // console.log(value);
      let result = value[0].id;
      // console.log('result: ', result)
      let itemId = req.params.items_id;
      // console.log('input: ', itemId);
      let quantity = Number(req.body.qty); //to be updated

      DataHelpers.insertOrUpdate(itemId, result, quantity, (data)  =>{
        res.status(200).send();
      }); // insertOrUpdate ends
    }); // findCurrentOrder ends
  });

  itemsRoutes.get("/order", (req, res) => {
    DataHelpers.retrieveReadyTime(req.session.user_id, (value) => {
      const readyTime = value[0].ready_time;
      res.render("confirmation.ejs")
    });
  });

  itemsRoutes.post("/order", (req, res) => {
    DataHelpers.updateCurrentOrder(req.session.user_id, "placed", () => {
      DataHelpers.createNewOrder(req.session.user_id, (value) => {
      res.redirect("/order");
     })
    })
  });

  // // Ajax to keep checking the status of the cart and display
  // itemsRoutes.get("/cart", function(req, res) {
  //   res.render("menu_orders.ejs");

  // owner to get the new order
  itemsRoutes.get("/restaurants/:restaurants_id/orders", function(req, res) {
    // Get userId from query string
    const restaurantId = req.params.restaurants_id;
    // Assign a cookie session
    req.session.user_id = restaurantId;
    DataHelpers.ownerOrders(restaurantId, (orders) => {
      let templateVars = {};
      templateVars = {
        myOrders : orders,
        userId   : restaurantId
      }
      res.render("owner.ejs", templateVars);
      res.status(200);
    });
  });

  // Owner submites delivary time
  itemsRoutes.post("/restaurants/:restaurants_id/pickup", function(req, res) {


  console.log(req.body.order_id);
  console.log(req.body.ready_time);



    let tempOrderId = req.body.order_id;
    let tempDeliveryTime = req.body.ready_time;

    Client.messages.create({
      to: "+17788836554",
      from: "+17786540355",
      body: tempDeliveryTime,
      }, function(err, message) {
        if (err) {
          console.error('twilio error', err.message)
          return;
        }
        console.log(message.sid);
      });

    DataHelpers.updateDelivaryTime(tempOrderId,tempDeliveryTime,(updates) => {
      console.log("data updated!")
      res.status(200);
      res.redirect("/restaurants/1/orders");
    });
  });

  // Owner submites completed item
  itemsRoutes.post("/restaurants/:restaurants_id/completed", function(req, res) {

    let tempOrderId = req.body.order_id;

    DataHelpers.updateCompleted(tempOrderId,(updates) => {
      console.log("data updated!")
      res.status(200);
      res.redirect("/restaurants/1/orders");
    });
  });

  // nima testing route
  itemsRoutes.get("/update", function(req, res) {
    let tempOrderId = 3;
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
