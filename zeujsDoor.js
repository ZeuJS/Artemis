"use strict";

var RoutesBag = require('./bags/routes.js');
var MiddlewaresBag = require('./bags/middlewares.js');

var RoutesMapper = require('./mappers/routes.js');
var MiddlewaresMapper = require('./mappers/middlewares.js');

module.exports =
{
  uninstallable: false,
  services: [
    {
      id: 'engineServer',
      service: require('./services/server.js'),
    },
    {
      id: 'artemisRoutes',
      service: new RoutesBag(),
    },
    {
      id: 'artemisMiddlewares',
      service: new MiddlewaresBag(),
    },
  ],
  events: [
    {
      on: 'zeujs_chaos_ready',
      id: 'startEngineServer',
      call: function(services) {
          services.findById('engineServer')(services);
      },
    },
    {
      on: 'zeujs_chaos_map',
      id: 'mapRoutesBagEngine',
      call: function (modules, services) {
        var RoutesBag = services.findById('artemisRoutes');
        new RoutesMapper(modules, RoutesBag);
      },
    },
    {
      on: 'zeujs_chaos_map',
      id: 'mapMiddlewaresBagEngine',
      call: function (modules, services) {
        var middlewaresBag = services.findById('artemisMiddlewares');
        new MiddlewaresMapper(modules, middlewaresBag);
      },
    },
  ],
  artemisRoutes: [
    require('./routes/index.js'),
  ],
  configs: {
    artemis: {
      listen: 1201,
    },
  },
};