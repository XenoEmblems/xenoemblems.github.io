// API I'm going to use The Movie Database

// PUT AS MANY FUNCTIONS AS POSSIBLE OUTSIDE THE FOR LOOP

//Step One: Iterate through all Nicolas Cage Movies through API
$(document).ready(function () {
	var apiKey = "d440a7f7ce806a7de7507e34281331c7";
	var nicolasCage = 2963;
  var sort = "sort_by=popularity.desc";
	var page = 1;
	var movieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&" + sort + "&include_adult=false&include_video=true&with_people=" + nicolasCage;
  var cagedMovies = [];
  var last = 0;
  var genre = [{
          "id": 28,
          "name": "Action"
          },
          {
            "id": 12,
            "name": "Adventure"
          },
          {
            "id": 16,
            "name": "Animation"
          },
          {
            "id": 35,
            "name": "Comedy"
          },
          {
            "id": 80,
            "name": "Crime"
          },
          {
            "id": 99,
            "name": "Documentary"
          },
          {
            "id": 18,
            "name": "Drama"
          },
          {
            "id": 10751,
            "name": "Family"
          },
          {
            "id": 14,
            "name": "Fantasy"
          },
          {
            "id": 36,
            "name": "History"
          },
          {
            "id": 27,
            "name": "Horror"
          },
          {
            "id": 10402,
            "name": "Music"
          },
          {
            "id": 9648,
            "name": "Mystery"
          },
          {
            "id": 10749,
            "name": "Romance"
          },
          {
            "id": 878,
            "name": "Science Fiction"
          },
          {
            "id": 10770,
            "name": "TV Movie"
          },
          {
            "id": 53,
            "name": "Thriller"
          },
          {
            "id": 10752,
            "name": "War"
          },
          {
            "id": 37,
            "name": "Western"
      }];
	//For loop for each page number
   
	console.log(movieUrl);
	// Use Get function to find the src url
  // Multiple for loops. For loop for each page using a for loop to iterate the pages.
  // One call needed outside the main one to get the number of pages.

  //Front End Builder


  // Helper Function to match Genre Id with Genre Name.
  function getGenreById(id) {
    return genre.filter(
      function(genre){return genre.id == id;}
    );
  }
  // Constructor function
  function createMovieObject(row, genre_array){
     
     var movieObject = {
        //Movie Title
        title: row["title"],
        // Genres
        genre: genre_array,
        overview: row["overview"],
        // Poster path is connected to the site itself.
        image: row["poster_path"],
        // Votes can be sorted.
        votes: row["vote_average"],
        // Can be sorted by Release Date too.
        release: row["release_date"]
     };

   return movieObject;
}   


  



    //For loop for pages

function pageLoop(){ 
    return $.get(movieUrl, function(pageresponse) {
        for(var h = 1; h <= pageresponse['total_pages']; h++){
            console.log(h);
            getMovies(h);
        }
    }); 
}

function getMovies(page) {
    var p = page;
    var movieUrl = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=en-US&" + sort + "&include_adult=false&include_video=true&with_people=" + nicolasCage + "&page=" + page;
    return $.get(movieUrl, function(response) {
      // How long should the array be?
      var results = response['total_results'];
      //For loop using the movies on each page.
      for (var m = 0; m < response.results.length; m++){
        //Create a Genre array for each movie.
        var genre_array = [];
        //Set Genre response to a variable
        var genre_response = response['results'][m]['genre_ids'];
          for (var i = 0; i < genre_response.length; i++) {
            // Find the Genre by Genre ID
            var genre_obj = getGenreById(genre_response[i]);
            genre_array.push(genre_obj[0].name);
          };
        // function - makeObject
        var movieObject = createMovieObject(response['results'][m], genre_array);
          cagedMovies.push(movieObject);
        };
        //In order to pass the array to another function when it is filled I used an if statement
        // if the length of the cagedMovies array is equal to the total_results in the API call.
        if (cagedMovies.length === results){
          console.log(cagedMovies.length);
          console.log(cagedMovies[91]);
          generateFrontEnd(cagedMovies);
        } else {
        console.log(cagedMovies.length);
      }
    }); 
};

function generateFrontEnd(cagedMovies){
  console.log(cagedMovies[0]);
  alert("YES");
}

  $.when(pageLoop()).done(function(){
    alert("Done");
    console.log(cagedMovies);
    console.log(cagedMovies.length);
  });


});






//Step Two: Handlebars Compile each piece of data into four movie divs.
// Make them responsive with Bootstrap.
// Apply Angular to make the Front End Pop.

//Step Three:
// Develop a modal for each div with more information when clicked on about the movie.

//Step Four:
// Build a search function that limits the movies based on genre, title,
// and description text.

//Step Five

//Step Five (Optional):
// Build Database for Log In and Sign In

// Step Six (Optional):

// Build Rating System that Users can log in and rate movies based on Cheese,
// Hamminess, Over the Top, and Overall Rating.

// Step Seven (Optional):
// Improve Search Engine to search by rating
