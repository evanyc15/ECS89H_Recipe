// module to handle the dynamic Web pages
var request = require('request');

function dynamic(response, parts) {

    if(typeof parts[2] !== 'undefined'){
        if(parts[2].indexOf("getKeywords") > -1){
            var iParts = parts[2].split("?");
            console.log(iParts);
        }
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<h1>Hello!</h1>");
    for(var i = 0; i < parts.length; i++){
        response.write("<p>parts["+i+"]:"+parts[i]+"</p>");
    }
    response.end();
}

// make this visible when the module is required
exports.dynamic = dynamic;