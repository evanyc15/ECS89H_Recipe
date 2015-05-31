// module to handle the dynamic Web pages
var request = require('request');
var annotater = require('./annotater');

function dynamic(response, parts) {

    if(typeof parts[2] !== 'undefined' && parts[2].indexOf("getKeywords") > -1){
        var iParts = parts[2].split("?");
        if(typeof iParts[1] !== 'undefined'){
            var query = iParts[1].replace("keywords","q");
            var url = "http://food2fork.com/api/search?key=682502870332fddb73d7c8ee7969545f&"+query;
            request(url, function(error, res, body){
                if(!error && response.statusCode === 200){
                    response.writeHead(200, {"Content-Type": "application/json"});
                    response.end(body);
                } else {
                    console.log(error);
                }
            });
        }
    } else if(typeof parts[2] !== 'undefined' && parts[2].indexOf("getRecipe") > -1){
        var iParts = parts[2].split("?");
        if(typeof iParts[1] !== 'undefined'){
            var query = iParts[1].replace("getRecipe","rId");
            var url = "http://food2fork.com/api/get?key=682502870332fddb73d7c8ee7969545f&"+query;
            request(url, function(error, res, body){
                if(!error && response.statusCode === 200){
                    response.writeHead(200, {"Content-Type": "application/json"});
                    // Begin recipe annotation to add water usages to ingredients of recipes
                    annotater.openDB();
                    var annotate = new annotater.Annotater(body);
                    annotate.annotate(function(body){
                        response.end(body);
                    });
                    annotater.closeDB();
                } else {
                    console.log(error);
                }
            });
        }
    } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("<h1>Hello!</h1>");
        for(var i = 0; i < parts.length; i++){
            response.write("<p>parts["+i+"]:"+parts[i]+"</p>");
        }
        response.end();
    }
}

// make this visible when the module is required
exports.dynamic = dynamic;