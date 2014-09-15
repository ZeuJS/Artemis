"use strict";
var http = require('http');

http.ServerResponse.prototype.json = function(json, httpCode) {
    httpCode = typeof httpCode !== 'undefined' ? httpCode : 200;
    json = typeof json !== 'undefined' ? json : { success: false, message: 'zeusjs.internal.artemis.noResponse' };
    var header = {
        'Content-Type': 'application/json; charset=utf-8',
        'Server': 'ZeuJS/Artemis',
        'X-Powered-By': 'ZeuJS'
    };
    this.writeHead(httpCode, header);
    this.end(JSON.stringify(json));
};

module.exports = http;