const express       = require('express');
const itemsRoutes  = express.Router();

module.exports = function(DataHelpers) {

 itemsRoutes.get("/restaurants", function(req, res) {

        res.render("index.html");


  });












    return itemsRoutes;

}