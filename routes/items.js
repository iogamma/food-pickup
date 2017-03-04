const express       = require('express');
const itemsRoutes  = express.Router();
const cookieSession = require('cookie-session');

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
  // Get userId from query string
  const restaurantId = req.params.id;
  // Assign a cookie session
  req.session.user_id = restaurantId;

  res.redirect('/restaurants');
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

  DataHelpers.getMenueItems(restaurantId, (menuItems) => {
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

  let restaurantId = req.params.restaurants_id;

  DataHelpers.ownerOrders(restaurantId, (orders) => {
    let templateVars = {};
    templateVars = {myOrders: orders}
    console.log(templateVars)
    res.render("owner.ejs", templateVars);
    res.status(200);
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