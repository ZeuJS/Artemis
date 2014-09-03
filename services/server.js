"use strict";

var server = require('../libraries/http.js');

module.exports = function(services) {
  var artemisRoutes = services.findById('artemisRoutes');
  var configs = services.findById('configs');
  server.createServer(function (req, res) {
    var currentRoute = artemisRoutes.resolve(req);
    if (typeof currentRoute === 'undefined') {
      res.json(
      {
        success: false,
        message: 'No route'
      },
      404
      );
      return;
    }
    var rails = {
      request: req,
      response: res,
      services: services
    };
    currentRoute.action(rails);

  }).listen(configs.find('artemis').listen);
};