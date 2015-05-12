var statix = require('node-static');
var http  = require('http');
var url = require("url");
var dynamic = require('./config/dynamic');

var fileServer = new statix.Server('./public');

function handler(request,response) {
    var urlReceived = request.url; // maybe complex string
    var urlObj = url.parse(urlReceived);
    var pathname = urlObj.pathname; // maybe simpler string
    var parts = pathname.split("/"); // array of strings

    if (parts[1] == "dyn") {  // parts[0] is ""
        dynamic.dynamic(response, parts);
    }
    else {
        request.addListener('end',function () {
            fileServer.serve(request, response, function (e, res) {
                fileServer.serveFile('/quantifiedRecipe.html', 200, {}, request, response);
            });

            //fileServer.serve('/quantifiedRecipe.html', response)
        }).resume();
    }
}

server = http.createServer(handler);
server.listen(20008);