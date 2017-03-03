const express       = require('express');
const itemsRoutes  = express.Router();

module.exports = function(DataHelpers) {

 itemsRoutes.get("/", function(req, res) {

        res.render("menuOrders.ejs");


  });












    return itemsRoutes;

}