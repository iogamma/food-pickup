//==================== Constants
const express       = require('express');
const cookieSession = require('cookie-session');
const util          = require('../lib/utils/helpers.js');
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
      DataHelpers.retrieveMenuData(restaurantId, orderId, (order) => {
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

  // user gets updated cart
  itemsRoutes.get("/cart/:id", (req, res) => {
    restaurant_id = req.params.id;
    DataHelpers.retrieveOrderId(req.session.user_id, (value) => {
      const orderId = value[0].id;
      DataHelpers.retrieveMenuData(restaurant_id, orderId, (value) => {
        res.json(value);
      });
    });
  });

  // Modify database based on users changing quantity
  itemsRoutes.post("/cart/:items_id", (req, res) => {
    DataHelpers.retrieveOrderId(req.session.user_id, (value) => {
      console.log(value);
      console.log(value[0]);
      let result = value[0].id;
      let itemId = req.params.items_id;
      let quantity = Number(req.body.qty); //to be updated

      DataHelpers.insertOrUpdate(itemId, result, quantity, (value)  =>{
        res.status(200).send();
      }); // insertOrUpdate ends
    }); // retrieveOrderId ends
  });

  itemsRoutes.get("/order", (req, res) => {
    DataHelpers.retrieveReadyTime(req.session.user_id, (value) => {
      const templateVars = { myValue : value };
      res.render("confirmation.ejs", templateVars)
    });
  });

  itemsRoutes.post("/order", (req, res) => {
    DataHelpers.updateCurrentOrder(req.session.user_id, "placed", (value) => {
      DataHelpers.insertNewOrder(req.session.user_id, (value) => {
        DataHelpers.retrieveOrderItems(req.session.user_id, (value) => {
          console.log("data: ", value)
          const urls = util.stringifyOrder(value);
          const urlMessage = "https://handler.twilio.com/twiml/EH00aca2e9cbf88acbc2462fd5b3fefe01?Order=" + urls;
          Client.calls.create({
           url: urlMessage,
           to: "+17788913326",  // owner's number
           from: "+17786540355"
          }, function(err, call) {
            if (err) {
            console.error('twilio error', err.message)
            return;
            }
          });
        })
      res.redirect("/order");
      });
    });
  });

  // owner to get the new order
  itemsRoutes.get("/restaurants/:restaurants_id/orders", function(req, res) {
    // Get userId from query string
    const restaurantId = req.params.restaurants_id;
    // Assign a cookie session
    // req.session.user_id = restaurantId;
    DataHelpers.ownerOrders(restaurantId, (orders) => {
      const groupMyOrder = util.groupQuery(orders);
      const templateVars = {
        myOrders : groupMyOrder,
        userId   : restaurantId
      };

      res.render("owner.ejs", templateVars);
      //res.status(200);
    });
  });

  // Owner submits delivary time
  itemsRoutes.post("/restaurants/:restaurants_id/pickup", function(req, res) {
    const tempOrderId = req.body.order_id;
    const tempDeliveryTime = req.body.ready_time;
    const customerMessage = `Your order will be ready in: ${tempDeliveryTime} minutes.`;

    Client.messages.create({
      to: "+17788913326",  // customer's phone number
      from: "+17786540355",
      body: tempDeliveryTime,
      }, function(err, message) {
        if (err) {
          console.error('twilio error', err.message)
          return;
        }
      });

    DataHelpers.updateDelivaryTime(tempOrderId,tempDeliveryTime,(updates) => {
      res.status(200);
      res.redirect("/restaurants/1/orders");
    });
  });

  // Owner submites completed item
  itemsRoutes.post("/restaurants/:restaurants_id/completed", function(req, res) {

    let tempOrderId = req.body.order_id;

    DataHelpers.updateCompleted(tempOrderId,(updates) => {
      res.status(200);
      res.redirect("/restaurants/1/orders");
    });
  });

  // nima testing route
  itemsRoutes.get("/update", function(req, res) {
    let tempOrderId = 3;
    let tempDeliveryTime = null;

    DataHelpers.updateDelivaryTime(tempOrderId,tempDeliveryTime,(updates) => {
      res.status(200);
    });
  });

  return itemsRoutes;
};
