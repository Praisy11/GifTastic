var movies = ["Ralph breaks the internet", "Beauty and the Beast", "Sing", "The Lion King", "Boss Baby"];
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      
      function displayMovieInfo() {
        console.log("INSIDE FUNCTION DIPSLAY MOVIE")
       
        var movie = $(this).attr("data-name");
        console.log("MOVIE: ", movie)
      
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10"
        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log("REPONSE: ", response)
       
          
          
          // Looping through giphs from api ----------------
          response.data.forEach(giph => {
            console.log("GIPH IN LOOP: ", giph)

              
          var movieDiv = $("<div class='movie'>");
          
          var rating = giph.rating;
         
           var pOne = $("<p>").text("Rating: " + rating);
          
          movieDiv.append(pOne);
           
         

          // Build images from data returned
          var movieImg = $('<img>')
          movieImg.attr('src',  giph.images.fixed_height.url)
          movieImg.attr('data-still',giph.images.fixed_height_still.url)
          movieImg.attr('data-state', "still")
          movieImg.attr('data-animate',  giph.images.fixed_height.url)
          movieImg.addClass("movie-class")
       

           $('#movie-view').prepend(movieImg);
          $("#movie-view").prepend(movieDiv);
         
       

         




          });// End giph loop ------------------------------

        
    
        });
       }
       // Function for displaying movie data
         function renderButtons() {
        
        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-view").empty();
         // Loops through the array of movies
        for (var i = 0; i < movies.length; i++) {
          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          // Added a data-attribute
          a.addClass("movie");
          a.attr("data-name", movies[i]);
          // Provided the initial button text
          a.text(movies[i]);
          // Added the button to the buttons-view div
          $("#buttons-view").append(a);
        
         
        }
      }
     
     

      // This function handles events where the add movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var movie = $("#movie-input").val().trim();
        // The movie from the textbox is then added to our array
        movies.push(movie);
        
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        // return false;
      });
    

      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);
   
      // Calling the renderButtons function to display the intial buttons
       renderButtons();
    

      // $(document).on('click', 'img', function(){
        
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        function checkState(){
          $("img").on('click',function() {
        
        
        var state = $(this).attr("data-state");
        
           if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      
      });
     
      // $("img").on('click',function() {
       
       };