"use strict";

var RoutesBag = require('./bags/routes.js');
var RoutesMapper = require('./mappers/routes.js');

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