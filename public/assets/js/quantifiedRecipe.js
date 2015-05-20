var recipeObject;

setTimeout(function(){
    $("#title").fadeIn(750);
}, 750);
setTimeout(function(){
    $("#container").fadeIn(750);
}, 1250);

$("#keywords").keyup(function (e){
    if(e.keyCode === 13){
        ajaxCall();
    }
});
$("body").on("click", ".recipeSelect", function(event){
    event.preventDefault();
    $(".recipeSelect").removeClass("btn-warning");
    $(this).addClass("btn-warning");
    showRecipeDetails($(this).attr("data-id"));
});
$("#recipeList").on("scroll", function() {
    if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
        $("#recipeIconDown").css("visibility","hidden");
    } else if($(this).scrollTop() === 0) {
        $("#recipeIconUp").css("visibility","hidden");
    } else {
        $("#recipeIconUp").css("visibility", "visible");
        $("#recipeIconDown").css("visibility", "visible");
    }
});

function ajaxCall(){
    // get the input
    var keywords = document.getElementById("keywords").value;

    // construct the url we want to send
    // url has a pathname (/dyn/getKeywords) and a
    // query part (?keywords=..., where ... are the keywords)
    var keywordsQuery = "/dyn/getKeywords?keywords="+keywords;

    $(".recipeSelect").remove();

    $("#recipeListLoader").show();
    $.ajax({
        type: 'GET',
        url: keywordsQuery,
        success: function(response){
            console.log(response);
            recipeObject = response.recipes;
            var i;

            for(i = 0; i < response.count; i++){
                $("#recipeList").append("<button class='btn btn-default recipeSelect' data-id='"+i+"'>"+recipeObject[i].title+"</button>");
            }
        },
        complete: function(){
            $("#recipeListLoader").hide();

            if($("#recipeList")[0].scrollHeight > $("#recipeList").height()){
                $("#recipeIconDown").css("visibility","visible");
            }
        }
    });
}
function showRecipeDetails(id) {
    $("#recipeDescrContainer").hide();
    $("#recipeDescrLoader").show();
    $.ajax({
        type: 'GET',
        url: "/dyn/getRecipe?getRecipe="+recipeObject[id].recipe_id,
        success: function(response){
            var i;

            $("#recipeDescrTitle").text(response.recipe.title);
            $("#recipeDescrImage").attr("src", response.recipe.image_url);
            $("#recipePublisher span").text(response.recipe.publisher);
            $("#recipePublisherUrl a").attr("href", response.recipe.publisher_url);
            $("#socialRank span").text(response.recipe.social_rank);
            $("#recipeIngredients").empty();
            for(i = 0; i < response.recipe.ingredients.length; i++){
                $("#recipeIngredients").append("<li>"+response.recipe.ingredients[i]+"</li>");
            }
            $("#recipeDescrLoader").hide();
            $("#recipeDescrContainer").show();
        }
    });
}