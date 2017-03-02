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










    return itemsRoutes;

};