function ajaxCall(){
    // get the input
    var keywords = document.getElementById("keywords").value;

    // construct the url we want to send
    // url has a pathname (/dyn/getKeywords) and a
    // query part (?keywords=..., where ... are the keywords)
    var keywordsQuery = "/dyn/getKeywords?keywords="+keywords;

    $.ajax({
        type: 'GET',
        url: keywordsQuery,
        success: function(response){
            console.log(response);
        }
    });
}