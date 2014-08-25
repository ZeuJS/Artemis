"use strict";

var UrlDefinition = require('../definition/url.js');

var indexDefinition = new UrlDefinition('/');

indexDefinition.push({
  id: "GET",
  action: function action(rails) {
    return {
      message: 'Welcome to the Mount Olympus.'
    }
  }
})

module.exports = {
  id: "index",
  definition: indexDefinition,
}