"use strict";

var UrlDefinition = require('../definition/url.js');

var indexDefinition = new UrlDefinition('/');

indexDefinition.push({
  id: "GET",
  action: function action(rails) {
    rails.response.json({
      message: 'Welcome to the Mount Olympus.'
    });
  }
})

module.exports = {
  id: "index",
  definition: indexDefinition,
}