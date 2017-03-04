const express       = require('express');
const itemsRoutes   = express.Router();

const cookieSession = require('cookie-session');

//var groupArray = require('group-array');

// Twilio Credentials
var accountSid = 'AC8fdabc7d09216813636cc2828fbcb42a';
var authToken = 'e2388f2a457ca51d5afbf02d90def812';

var twilio = require('twilio');
var Client = new twilio.RestClient(accountSid, authToken);
//require the Twilio module and create a REST client
// var client = new require('twilio').RestClient(accountSid, authToken);

itemsRoutes.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

module.exports = function(DataHelpers) {


// GET Routes

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
    res.render("index.ejs", templateVars);

  DataHelpers.getAllRestaurants((restaurants) => {

    console.log(restaurants)

    res.render("owner.ejs",restaurants);
    });



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
  res.redirect('/restaurants');
});

// login owner and set user cookie
itemsRoutes.get("/login/r/:id", (req, res) => {


  res.redirect('/');
});

itemsRoutes.post('/logout', (req, res) => {
  //TODO: Delete a cookie session
  if (req.session) {
    req.session = null;
  }
  res.redirect('/');
});



// Load the menu of the chosen restaurant
itemsRoutes.get("/restaurants/:id", (req, res) => {
  const restaurantId = req.params.id;

  DataHelpers.getMenuItems(restaurantId, (menuItems) => {
    const templateVars = {
      userId        : req.session.user_id,
      restaurantId  : restaurantId,
      menuItems     : menuItems
    };
    console.log(menuItems);
    res.render("menu_orders.ejs", templateVars);
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

itemsRoutes.get("/cart", (req, res) => {
  DataHelpers.retrieveData(1, (value) => {
    console.log(value);
    res.status(200);
  })
})


itemsRoutes.get("/login", (req, res) => {
  DataHelpers.insertNewOrder(req.session.user_id, (value) => {
    res.status(200);
  })
})

itemsRoutes.post("/order", (req, res) => {
  DataHelpers.updateCurrentOrder(req.session,user_id, "placed", () => {
    DataHelpers.createNewOrder(req.session.user_id, (value) => {
    res.status(200);
   })
  })
})

// itemsRoutes.get("/cart/:items_id", (req, res) => {

//   DataHelpers.findCurrentOrder(1, (value) => {
//     // console.log(value);
//     let result = value[0].id;
//     // console.log('result: ', result)
//     let itemId = req.params.items_id;
//     // console.log('input: ', itemId);
//     let quantity = 6; //to be updated
//     DataHelpers.insertOrUpdate(itemId, result, quantity, (data)  =>{
//       console.log('item_id: ', itemId,'currentOrder: ', result,'quantity: ', quantity);
//       res.status(200);
//     }); // insertOrUpdate ends
//   }); // findCurrentOrder ends
// });

// Modify database based on users changing quantity
itemsRoutes.post("/cart/:items_id", (req, res) => {

  DataHelpers.findCurrentOrder(req.session.user_id, (value) => {
    // console.log(value);
    let result = value[0].id;
    // console.log('result: ', result)
    let itemId = req.params.items_id;
    // console.log('input: ', itemId);
    let quantity = req.body.quantity; //to be updated
    DataHelpers.insertOrUpdate(itemId, result, quantity, (data)  =>{
      console.log('item_id: ', itemId,'currentOrder: ', result,'quantity: ', quantity);
      res.status(200);
    }); // insertOrUpdate ends
  }); // findCurrentOrder ends



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

        //            }
});


// here we get a boolean that shows if the order has been submitted
itemsRoutes.post("/order", function(req, res) {
  res.redirect("/order");

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