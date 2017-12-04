


var characters = ["Superman", "Batman", "Wonder Woman", "The Joker", "Thor", "Loki", "Magneto", "Venom", "Spider Man", "Deadpool", "The Hulk", "Captain America"];

		function makeButtons(){

			$(".displaybuttons").empty();

			for(var i = 0; i < characters.length; i++){
				
				var a = $("<button>");
				a.addClass("btn btn-default");
				a.css("background", "lightblue");
				a.addClass("character-button");
				a.attr("data-name", characters[i]);
				a.text(characters[i]);
				$(".displaybuttons").append(a);
			}
		}

		function displayImages(){
			$(".display-images").empty();
			
			var character = $(this).attr("data-name");
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=hcPTEdeIxgj1yAl46R2v9DwCoab5N6R0&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response){
        	
        	var results = response.data;
        	
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


        	$(".display-images").append(characterDiv);
        	
        	}
        });

		}

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

			

		
		$("#add-character").on("click", function(e){
			e.preventDefault();

			var item = $("#character-input").val().trim();
			characters.push(item);

			makeButtons();
			$("#character-input").val("");
		});



		$(document).on("click", ".character-button", displayImages);

		makeButtons();




