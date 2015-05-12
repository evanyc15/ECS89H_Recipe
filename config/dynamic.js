// module to handle the dynamic Web pages
var http = require("http");

function dynamic(response, parts) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Hello!</h1>");
    for(var i = 0; i < parts.length; i++){
        response.write("<p>parts["+i+"]:"+parts[i]+"</p>");
    }
    response.end();
}

// make this visible when the module is required
exports.dynamic = dynamic;