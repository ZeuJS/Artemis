"use strict";

var Server = require('../libraries/http.js');
var Formidable = require('formidable');
var Querystring = require('qs');
var Url = require('url');

module.exports = function(services) {
  var artemisRoutes = services.findById('artemisRoutes');
  var configs = services.findById('configs');
  Server.createServer(function (req, res) {
    req.url = Url.parse(req.url);
    req.query = Querystring.parse(req.url.query);
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
    var form = new Formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if (err) {
        throw err;
      }
      req.params = Querystring.parse(fields);
      req.files = files;
      var middlewaresStack = [];
      if (typeof currentRoute.middlewares === 'object') {
        currentRoute.middlewares.forEach(function(middleware) {
          middlewaresStack.push(services.findById('artemisMiddlewares').findById(middleware).action);
        });
      }
      middlewaresStack.push(currentRoute.action);
      iterateMiddlewares(rails, middlewaresStack);
    });

  }).listen(configs.find('artemis').listen);
};

function iterateMiddlewares (rails, middlewares) {
  var middleware = middlewares.shift();
  if (middlewares.length === 0) {
    middleware(rails);
  } else {
    middleware(rails, function (pass, cb) {
      if (pass) {
        iterateMiddlewares(rails, middlewares);
      } else {
        cb();
      }
    });
  }
}