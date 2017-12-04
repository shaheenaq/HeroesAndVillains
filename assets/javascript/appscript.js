
//Global variables
//Initial array populated with values to be displayed as buttons
var characters = ["Superman", "Batman", "Wonder Woman", "The Joker", "Thor", "Loki", "Magneto", "Venom", "Spider Man", "Deadpool", "The Hulk", "Captain America"];

//Function to create the buttons and display in the appropriate div in html
		function makeButtons(){
//Empty out the div from the previous display
			$(".displaybuttons").empty();
//Loop through the array and create a button for each index
			for(var i = 0; i < characters.length; i++){
				//creating a button and adding class and css
				var a = $("<button>");
				a.addClass("btn btn-default");
				a.css("background", "lightblue");
				a.addClass("character-button");
				a.attr("data-name", characters[i]);
				a.text(characters[i]);
				//displaying the created buttons in a location on the html page
				$(".displaybuttons").append(a);
			}
		}
//Function to get the information from the giphy app and display it on page
		function displayImages(){
			//Empty out the div from the previous display of gifs
			$(".display-images").empty();
			//creating a variable that will hold the name,from the array[i], of the button
			var character = $(this).attr("data-name");
			//Putting together the url for the query with the name variable
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=hcPTEdeIxgj1yAl46R2v9DwCoab5N6R0&limit=10";
//Calling the ajax method to get the data from the api
        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response){
        	
        	var results = response.data;
  //looping through to create a div which holds the rating and image data
  //for the requested query
        	for(var i = 0; i < results.length; i++){
        	
        	var characterDiv = $("<div>");
        	
        	characterDiv.addClass("character-gif col-md-4");
        	
        	var rated = results[i].rating;
        	console.log(rated);

        	var pOne = $("<p>").text("Rated: " + rated);

        	characterDiv.append(pOne);

        	var stillUrl = results[i].images.fixed_height_still.url;
        	console.log(stillUrl);

        	var image = $("<img>").attr("src", stillUrl);
        	image.addClass("imgGif");
        	image.attr("data-state", "still");
        	image.attr("data-still", stillUrl);
        	
        	var gifUrl = results[i].images.fixed_height.url;
        	image.attr("data-animate", gifUrl);
        	
        	
        

        	characterDiv.append(image);

//Displaying in the div location on the html page
        	$(".display-images").append(characterDiv);
        	
        	}
        });

		}
//Click on the gif images in the document and the function will pause or animate the gif
		$(document).on("click", ".imgGif", function(){
			var state = $(this).attr("data-state");

			if (state === "still"){
				$(this).attr("src", $(this).attr("data-animate"));
				$(this).attr("data-state", "animate");

			}else {

				$(this).attr("src", $(this).attr("data-still"));
        		$(this).attr("data-state", "still");
			}


		});

			
//Input submit button to get the value from the input box and add it to the array
		
		$("#add-character").on("click", function(e){
			e.preventDefault();

			var item = $("#character-input").val().trim();
			characters.push(item);
//call the function to make new buttons from array
			makeButtons();
			//clears the input box afterwards
			$("#character-input").val("");
		});


//Listens for click on the buttons on the document
		$(document).on("click", ".character-button", displayImages);

		makeButtons();




