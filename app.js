var statix = require('node-static');
var http  = require('http');

var fileServer = new statix.Server('./public');

function handler (request,response) {
    request.addListener('end',function () {
        fileServer.serve(request, response)}).resume();
}

server = http.createServer(handler);
server.listen(20008);