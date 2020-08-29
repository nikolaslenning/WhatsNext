
// Set API in carousel
// var index = 0




// Function that calls 2nd API so both can occupy same carousel
// Set array to carousel
// Scope API and determine additional functionality 
// create for loop to create x number of cards to populate
// Display synopsis and critical data (RT, IMDb) below when image clicked


var newSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Anew7%3AUS&p=1&t=ns&st=adv",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
		"x-rapidapi-key": "3a6a7033a5msh785a852c65c15c2p1ed117jsne310d6bcef70"
	}
}


function pull() {
	$.ajax(newSettings).done(function (newResponse) {
		// console.log(newResponse.ITEMS[0].rating);
		$(".p1").text("Rating: " + newResponse.ITEMS[0].rating)
		console.log(newResponse.ITEMS[0].title); //we the maries

		var arraySlice = newResponse.ITEMS.slice(0, 10)
		arraySlice.forEach(function (currentElement, index, array) {
			var index = ('');
			var movieCardDiv = $('<div>');
			var titleDiv = $('<div>');
			var typeDiv = $('<div>');
			var runtimeDiv = $('<div>');
			var synopsisDiv = $('<div>');
			var imageDiv = $('<img>');
			$(movieCardDiv).attr('class', 'uk-placeholder uk-text-center');
			$(titleDiv).text(currentElement.ITEMS.title) // 0 or index don't work
			console.log(currentElement);
			// console.log(newResponse);


			$(movieCardDiv).appendChild(titleDiv);
			$(movieCardDiv).appendChild(typeDiv);
			$(movieCardDiv).appendChild(runtimeDiv);
			$(movieCardDiv).appendChild(synopsisDiv);
			$(movieCardDiv).appendChild(imageDiv);
			$('#box').append(movieCardDiv);
		})





		//pull image
		//, xxtitle, xxtype, xxruntime xxsynopsis
		//append to cards class = "uk-placeholder uk-text-center"
	});
}
var expireSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get%3Aexp%3AUS&t=ns&st=adv&p=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
		"x-rapidapi-key": "3a6a7033a5msh785a852c65c15c2p1ed117jsne310d6bcef70"
	}
}

// pull();
// $.ajax(expireSettings).done(function (expireResponse) {
// 	console.log(expireResponse);
pull();

var movie = $(this).attr("data-name");
var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
$.ajax({
	url: queryURL,
	method: "GET"
}).then(function (response) {
	$("#movies-view").text(JSON.stringify(response));
});

//pull genre, 




