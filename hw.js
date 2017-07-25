var tvShows = ["Arrested Development", "The Simpsons", "Game of Thrones", "Tom and Jerry", "Brooklyn 99", "Stranger Things", "Rick and Morty", "Parks and Recreation", "Dark Matter",  "The Expanse", ]

function displayTV(){
        $("#tvShows").empty();
    	var show = $(this).attr("data-name");
    	console.log (show);
    	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+show+"&limit=10&api_key=a6ff36fa221e48c9b79ab5492a3889ed"

    	$.ajax({
    		url: queryURL,
    		method: "GET"
    	})
    	.done(function(response) {
    		var results = response.data;
    		console.log(results);

    		for(var i = 0; i < results.length; i++ ){
    			var showDiv = $("<div class = 'item'>")
    			
    			var rating = results[i].rating;
    			var p = $("<p>").text("Rating: " + rating);

    			var showGifs = $("<img>");
    			showGifs.attr("src", results[i].images.fixed_height_still.url);
                showGifs.addClass("gifs");
                showGifs.attr("data-state", "still");
                showGifs.attr("data-number", i)
    			showDiv.append(p);
    			showDiv.append(showGifs);

    			$("#tvShows").prepend(showDiv);
    		}

            $('.item').on('click', '.gifs', function() {   //stars and stops the gif
     
                var state = $(this).attr('data-state');  
                var number = $(this).attr('data-number');  //getting the object number
                console.log(state);
                console.log(number);

                if(state == "still"){
                    $(this).attr("src", results[number].images.fixed_height.url)
                    $(this).attr('data-state', 'animate');
                }

                if(state != "still"){
                    $(this).attr("src", results[number].images.fixed_height_still.url);
                    $(this).attr("data-state", "still");
                }
            });
    	
      });
}

function getButtons(){  //populates the buttons

$("#tvButtons").empty();

	for (var i = 0; i < tvShows.length; i++){
		var button = $("<button>");
		button.addClass("tvShow");
		button.attr("data-name", tvShows[i]);
		button.text(tvShows[i]);
		$('#tvButtons').append(button);
		console.log(button);
	}
}



$('#addTV').on('click', function(){  //adds a new show
	event.preventDefault();
    var newShow =$('#tv-input').val().trim();
    var newShowLength =($('#tv-input').val().length);

    if(newShowLength == 0){
        console.log("nothing");
    }else{
	
	tvShows.push(newShow);
	getButtons();
}
    

});

 // $("#tvButtons").on("click", ".tvShow", displayTV);
 // getButtons();

// $('.item').on('click', '.gifs', function() {
     
//          var state = $(this).attr('data-state');  //gets the data-state from the gif click
//          console.log(state);

//         // if(state == "still"){
//         //  var animate = $(this).attr('data-animate');  // sets the animate var to the url of animated gif
//         //  console.log(animate);
//         //  $(this).attr('src', images.original.url);                //sets src attribute to the animate var
//         //  $(this).attr('data-state', 'animate');       //sets the data-state to animate
//         // }
      
//         // if(state !== 'still'){
//         //   var still = $(this).attr(images.original_still.url);     //sets the still var to the url of the still gif
//         //   $(this).attr('src', still);                 //changes the source of gif to still
//         //   $(this).attr('data-state', "still")         //changes data-state to still
//         // }                                             //NYT api key af8c49808574405eb22a2afc2bc2338d
    
//     });

$("#tvButtons").on("click", ".tvShow", displayTV);
 getButtons();