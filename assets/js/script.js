// $(document).ready(function () {
//   $("select").formSelect();
// });


// FOOD API 
var randomFoodUrl = "www.themealdb.com/api/json/v1/1/random.php"
var foodGenImage = $('.foodImage')

// grabs random url for food
function getFoodApi() {
    refreshFood();

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
            
            $('#foodCardTitle').append(foodName);
            $('#foodCardRecipe').append(recipe);
            $('.foodImage').attr(`src`, (data.meals[0].strMealThumb));
            
        }
        
    )};

    // refreshes information on button click
    function refreshFood() {
        $('#foodCardTitle').empty();
        $('#foodCardRecipe').empty();
    }


    $('#randomFoodBtn').click(function(event) {
        event.preventDefault();
        console.log('clicked');
        getFoodApi();
    })



    /** THIS IS THE BEGINING OF THE MOVIE FEATURE (jorge) */

var cardTitleEl = $('#title');
var revealTitleEl = $('#reveal-title');
var cardImageEl = $('#image');
var cardDescriptionEl = $('#description');
var releaseDateEl = $('#release-date');
var averageRatingEl = $('#average-rating');
var genresEl = $('#genres');
var whereToWatchEl = $('#where-to-watch');

var movieSearchBtn = $('#movieSearchBtn');
var movieContainerEl = $('#movie-container');
var popularEl = $('#popular-true');
var topRatedEl = $('#top-rated-true');
var movieChoiceEl = $('#movie-choice');

//this will generate a random page number in our API call.
var pageNumber;

//this will be the request made to the TMDB Api to return a random movie.
var sampleCall;


//this will format the date in the way we need it to display.
function formatDate(dateArray){
    var formatArray = [];
    formatArray[0] = dateArray[1];
    formatArray[1] = dateArray[2];
    formatArray[2] = dateArray[0];

    var stringDate = formatArray.join('/');

    return stringDate;

}

//this function will get a random movie and place the infos on the card elelemnt.
function getRandomMovie(){

    var moviesArray = [];
    var theMovie;
    var releaseDate;
    var prettyDate;
    var avScore;
    var movieId;
    var genresArray = [];


    console.log(movieChoiceEl.val());


    //this if statement will process the user's filter choice.
    if(movieChoiceEl.val() == 2){

        pageNumber = Math.floor(Math.random() * 500);
    
    sampleCall = `
    https://api.themoviedb.org/3/movie/popular?api_key=63dbf71c654e332e53fe81842222eb42&language=en-US&page=${pageNumber}`;
    }
    else if(movieChoiceEl.val() == 1){
    
        pageNumber = Math.floor(Math.random() * 460);
    
        sampleCall = `
    https://api.themoviedb.org/3/movie/top_rated?api_key=63dbf71c654e332e53fe81842222eb42&language=en-US&page=${pageNumber}`;
    }
    else{
        pageNumber = Math.floor(Math.random() * 500);
    
        sampleCall = `https://api.themoviedb.org/3/discover/movie?api_key=63dbf71c654e332e53fe81842222eb42&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`;
    }




    
    fetch(sampleCall)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        

        moviesArray = data.results;

        theMovie = moviesArray[Math.floor(Math.random() *moviesArray.length +1)];

        
        releaseDate = theMovie.release_date;
        releaseDate = releaseDate.split('-');
        prettyDate = formatDate(releaseDate);
        
        avScore = theMovie.vote_average;

        //this will set some values about the movie on the card element.
        cardTitleEl.text(theMovie.title);
        revealTitleEl.text(theMovie.title);
        cardImageEl.attr(`src`, `https://image.tmdb.org/t/p/w500/${theMovie.backdrop_path}`)
        cardDescriptionEl.text(theMovie.overview);
        releaseDateEl.text(`Release Date: ${prettyDate}`);
        averageRatingEl.text(`Average Rating: ${avScore}/10`);


        movieId = theMovie.id;

            //This will get more info about the movie.
            movieCall = `https://api.themoviedb.org/3/movie/${movieId}?api_key=63dbf71c654e332e53fe81842222eb42&language=en-US`;

            fetch(movieCall)
            .then((res) => {
            return res.json();
            })
            .then((data) => {
    

            for(i = 0; i < data.genres.length; i++){
                genresArray.push(data.genres[i].name);
            }
            
            var prettyGenres = genresArray.join(', ');

            genresEl.text(`Genre: ${prettyGenres}`);


            });

        

            whereToCall = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=63dbf71c654e332e53fe81842222eb42`

            fetch(whereToCall)
            .then((res) =>{
            return res.json();
            })
            .then((data) =>{

            var whereToLink;

            if(data.results.US.link == null || data.results.US.link == undefined){

                whereToWatchEl.text(`Sorry! We don't know where you can watch this movie`);
                whereToWatchEl.attr('href', 'https://www.themoviedb.org/');

            }
            else{

            whereToLink = data.results.US.link;
            whereToWatchEl.attr('href', whereToLink);

            }

            });
        
        });

}

function handleMovieSearch(){
    movieContainerEl.removeClass('hide');
    getRandomMovie();
}

movieSearchBtn.on('click', handleMovieSearch);