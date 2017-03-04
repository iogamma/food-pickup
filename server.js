"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const logger      = require('winston');
logger.level      = process.env.LOG_LEVEL || 'info';
const express     = require("express");
const bodyParser  = require("body-parser");
const cookieSess  = require('cookie-session');
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const db = require("./lib/db.js");

// Seperated Routes for each Resource
const queries = require("./lib/queries.js")(db);
const Routes = require("./routes/items")(queries);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/", Routes);

// Home page
app.get("/", (req, res) => {
  res.render("index.ejs");
});

const server = app.listen(PORT, () => {
  const address = server.address();
  logger.info('Server listening on port:' , address.port);
});

