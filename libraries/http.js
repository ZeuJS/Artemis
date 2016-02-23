"use strict";
var http = require('http');

http.ServerResponse.prototype.json = function(json, httpCode) {
    httpCode = httpCode || 200;
    json = json || { success: false, message: 'zeusjs.internal.artemis.noResponse' };
    var header = {
        'Content-Type': 'application/json; charset=utf-8',
        'Server': 'ZeuJS/Artemis',
        'X-Powered-By': 'ZeuJS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization'

};
    this.writeHead(httpCode, header);
    this.end(JSON.stringify(json));
};

module.exports = http;