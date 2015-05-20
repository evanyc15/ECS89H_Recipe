var recipeObject;

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
        }
    });
}
function showRecipeDetails(id) {
    console.log(id);
    $.ajax({
        type: 'GET',
        url: "/dyn/getRecipe?getRecipe="+recipeObject[id].recipe_id,
        success: function(response){
            console.log(response);
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

            $("#recipeDescrContainer").show();
        }
    });
}