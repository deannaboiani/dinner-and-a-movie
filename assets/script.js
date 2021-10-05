// $(document).ready(function () {
//   $("select").formSelect();
// });


// FOOD API 
var randomFoodUrl = "www.themealdb.com/api/json/v1/1/random.php"
var foodGenImage = $('.foodImage')

// grabs random url for food
function getApi() {
    var requestUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    console.log(requestUrl);
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
        console.log(response)
    })
    .then(function (data) {
        console.log(data);
// creates new elements for food name and recipe instructions to put on page
            console.log(data.meals[0].strInstructions);
            var foodName = document.createElement('h3');
            var recipe = document.createElement('p');

            foodName.textContent = data.meals[0].strMeal;
            recipe.textContent = data.meals[0].strInstructions;
            
            $('.foodCardTitle').append(foodName);
            $('#foodCardRecipe').append(recipe);

            
        }
        
    )};$('#randomFoodBtn').click(function(event) {
        event.preventDefault();
        console.log('clicked');
        getApi();
    })