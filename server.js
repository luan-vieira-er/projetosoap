"use strict";

var soap = require('soap');
var http = require('http');

var myService = {
    ws: {
        pi: {
            newPi : function(args) {
                var n = 10000000, inside = 0, x, y, i;
                for (i = 0; i<n; i++){
                    x = Math.random();
                    y = Math.random();
                    if (Math.sqrt(x * x + y * y) <= 1){
                        inside++;
                    }
                }
                var v = 4 * inside / n;
                console.log(v);  
                    return { v };

                    
            }
        }
    }
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

var server = http.createServer(function(request,response) {
    response.end("404: Not Found: "+request.url);
});

server.listen(process.env.PORT || 7070);
soap.listen(server, '/myservice', myService, xml);