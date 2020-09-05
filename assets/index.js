// // Set API in carousel
// // Function that calls 2nd API so both can occupy same carousel
// // Set array to carousel
// // Scope API and determine additional functionality 
// // create for loop to create x number of cards to populate
// // Display synopsis and critical data (RT, IMDb) below when image clicked

// Variables that hold our AJAX request information 
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

// pull function houses both ajax request
function pull() {
	//ajax request for Netflix Information
	$.ajax(newSettings).done(function (newResponse) {
		//card that holds all appended information from unogs ajax request
		var cardBox = $('#swiper-wrapper');
		//variable that takes slice of ajax info from index 0 to 99
		var arraySlice = newResponse.ITEMS.slice(0, 99)
		//
		arraySlice.forEach(function (currentElement, index, array) {
			// console.log(currentElement);
			// console.log(currentElement.title);
			// console.log(newResponse.ITEMS);

			//create containers to hold information being returned
			var movieCardDiv = $('<div>');
			var titleDiv = $('<h3>');
			var typeDiv = $('<p>');
			var runtimeDiv = $('<p>');
			var synopsisDiv = $('<p>');
			var imageDiv = $('<img>');
			var movieTitle = currentElement.title;

			//adding class to container that will house all the little information containers
			// dynamically adding infomation recieved from ajax request to containors created above
			movieCardDiv.attr('class', "swiper-slide uk-card uk-card-default uk-card-body");
			titleDiv.text('Title: ' + currentElement.title);
			// console.log(currentElement.title);
			typeDiv.text('Type: ' + currentElement.type);
			runtimeDiv.text("Runtime: " + currentElement.runtime);
			synopsisDiv.html('Synopsis: ' + currentElement.synopsis);
			imageDiv.attr('src', currentElement.image);

			// appending containers housing info from ajax request to one container, then append that container to the carousel container swiper-wrapper
			movieCardDiv.append(imageDiv);
			movieCardDiv.append(titleDiv);
			movieCardDiv.append(typeDiv);
			movieCardDiv.append(runtimeDiv);
			movieCardDiv.append(synopsisDiv);
			cardBox.append(movieCardDiv);

			// 2nd Ajax request to OMDBi that uses information returned in the 1st ajax request above
			var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";
			$.ajax({
				url: queryURL,
				method: "GET"
			}).then(function (responseOMDB) {
				// console.log(responseOMDB);
				var responseLength = responseOMDB.length;
				//create variables for the information recieved from ajax request
				var MPAArating = responseOMDB.Rated;
				var originCountry = responseOMDB.Country;
				var criticRating = responseOMDB.Ratings;
				var runtimeOMDB = responseOMDB.Runtime; // not sure if needed or a way to not display if result is N/A

				//create containers to house the information holding variables above
				var boxMPAA = $('<p>');
				var boxOriginCountry = $('<p>');
				var boxCriticRating = $('<div>');

				//adding information recieved to the containers that were created above
				boxMPAA.text('MPAA Rating: ' + MPAArating);
				boxOriginCountry.text('Country: ' + originCountry);
				// boxCriticRating.text('Critic Rating: ' + criticRating);

				//appending smaller containers houseing info to the main container displayed in the carousel
				movieCardDiv.append(boxMPAA);
				movieCardDiv.append(boxOriginCountry);
				movieCardDiv.append(boxCriticRating);
				runtimeDiv.append(runtimeOMDB); // not sure if needed or a way to not display if result is N/A

				console.log(responseOMDB);
				// console.log(criticRating);
				// console.log(originCountry);
				for(var i = 0; i < criticRating.length; i++) {
					var ratingDiv = $('<div>');
					var criticResponse = responseOMDB.Ratings[i];
					var ratingSource = criticResponse.Source;
					var ratingValue = criticResponse.Value
					// console.log('criticResponse', '---------', criticResponse);
					ratingDiv.text(`Critic Rating: ${ratingValue} from ${ratingSource}`);
					if (criticRating[i].Source==="Internet Movie Database"){
						var imdbIcon = $("<img>")
						imdbIcon.attr("src", "./assets/IMG/imdb_logo.jpeg").addClass("ratingIcon");
						
						
                        var imdbNode = $("<div>").text(`${imdbIcon} : ${criticRating[i].Value}`);
                        // boxCriticRating.append(imdbNode);
                        boxCriticRating.append(imdbIcon);
                    } else if(criticRating[i].Source==="Rotten Tomatoes"){
                        // repeat w RT
                        console.log("I hit Rotten Tomatoes")
                    }else if(criticRating[i].Source==="Metacritic"){
                        // repeat w MC
                        console.log("I hit MetaCritic")
                    }
					//original line
					//ratingDiv.text("Rating div: " + JSON.stringify(criticResponse));
					movieCardDiv.append(ratingDiv);
				}

				// for (var i = 0; i < 3; i++){
				// 	console.log(criticRating[i].Source)
					
                //     if (criticRating[i].Source==="Internet Movie Database"){
                //         var imdbIcon = $("<img>").attr("src", "./assets/img/imd_logo.jpeg")
                //             .addClass("ratingIcon");
                //         var imdbNode = $("<div>").text(`${imdbIcon} : ${criticRating[i].Value}`);
                //         boxCriticRating.append(imdbNode);
                //     } else if(criticRating[i].Source==="Rotten Tomatoes"){
                //         // repeat w RT
                //         console.log("I hit Rotten Tomatoes")
                //     }else if(criticRating[i].Source==="Metacritic"){
                //         // repeat w MC
                //         console.log("I hit MetaCritic")
                //     }
                // }

				//creating swiper carousel 
				var appendNumber = 600;
				var prependNumber = 1;
				var swiper = new Swiper('.swiper-container', {
					slidesPerView: 3,
					centeredSlides: true,
					spaceBetween: 30,
					pagination: {
						el: '.swiper-pagination',
						type: 'fraction',
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					// virtual: {
					// 	slides: (function () {
					// 		var slides = [];
					// 		for (var i = 0; i < 600; i += 1) {
					// 			slides.push('Slide ' + (i + 1));
					// 		}
					// 		return slides;
					// 	}()),
					// },
				});
				document.querySelector('.slide-1').addEventListener('click', function (e) {
					e.preventDefault();
					swiper.slideTo(0, 0);
				});
				document.querySelector('.slide-50').addEventListener('click', function (e) {
					e.preventDefault();
					swiper.slideTo(49, 0);
				});
				document.querySelector('.slide-100').addEventListener('click', function (e) {
					e.preventDefault();
					swiper.slideTo(99, 0);
				});
			});
		});
	});


	//2nd AJAx REquest that pulls netflix movies that are leaving. Same as the entire block of code above

	// $.ajax(expireSettings).done(function (expireResponse) {
	// 	// console.log(expireResponse);
	// 	var cardBox = $('#going-card-box');
	// 	var arraySlice = expireResponse.ITEMS.slice(0, 10)
	// 	arraySlice.forEach(function (currentElement, index, array) {
	// 		// console.log(currentElement);
	// 		// console.log(currentElement.title);
	// 		// console.log(newResponse.ITEMS);
	// 		var movieCardDiv = $('<div>');
	// 		var titleDiv = $('<h3>');
	// 		var typeDiv = $('<p>');
	// 		var runtimeDiv = $('<p>');
	// 		var synopsisDiv = $('<p>');
	// 		var imageDiv = $('<img>');
	// 		var movieTitle = currentElement.title


	// 		movieCardDiv.attr('class', 'uk-placeholder uk-text-center');
	// 		titleDiv.text('Title: ' + currentElement.title);
	// 		// console.log(currentElement.title);
	// 		typeDiv.text('Type: ' + currentElement.type);
	// 		runtimeDiv.text("Runtime: " + currentElement.runtime);
	// 		synopsisDiv.html('Synopsis: ' + currentElement.synopsis);
	// 		imageDiv.attr('src', currentElement.image);

	// 		movieCardDiv.append(imageDiv);
	// 		movieCardDiv.append(titleDiv);
	// 		movieCardDiv.append(typeDiv);
	// 		movieCardDiv.append(runtimeDiv);
	// 		movieCardDiv.append(synopsisDiv);
	// 		cardBox.append(movieCardDiv);

	// 		var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";
	// 		$.ajax({
	// 			url: queryURL,
	// 			method: "GET"
	// 		}).then(function (responseOMDB) {
	// 			var MPAArating = responseOMDB.Rated;
	// 			var originCountry = responseOMDB.Country;
	// 			var criticRating = responseOMDB.Ratings

	// 			var boxMPAA = $('<p>');
	// 			var boxOriginCountry = $('<p>');
	// 			var boxCriticRating = $('<p>');

	// 			boxMPAA.text('Rated: ' + MPAArating);
	// 			boxOriginCountry.text('Country: ' + originCountry);
	// 			boxCriticRating.text('Critic Rating: ' + JSON.stringify(criticRating));

	// 			movieCardDiv.append(boxMPAA);
	// 			movieCardDiv.append(boxOriginCountry);
	// 			movieCardDiv.append(boxCriticRating);

	// 			console.log(responseOMDB);
	// 			console.log(criticRating);
	// 			console.log(originCountry);
	// 		});
	// 	});
	// });
};

//Calling pull function the start the ajax requests above

pull();


// const friends = [
// 	{
// 		name: 'Jane Doe',
// 		likes: ['Ice Cream', 'puppies', 'sunshine', ['baseball', 'soccer', 'jai alai']]
// 	},
// 	{
// 		name: 'John Doe',
// 		likes: ['soft serve', 'cats', 'overcast']
// 	},{
// 		name: 'Jax Doe',
// 		likes: ['frozen yogurt', 'goldfish', ['beer pong', 'frisbee golf', 'pumpkin racing']]
// 	}

// ]


// for(let i = 0; i < friends.length; i++){
// 		const currentFriend = friends[i]
// 		const friendName = currentFriend.name
// 		const friendLikes = currentFriend.likes
// 		let returnString = `${friendName} likes`

// 	for(let j = 0; j < friendLikes.length; j++){
// 		if(Array.isArray(friendLikes[j])){
// 			returnString += ` their favorite sports are `
// 			for(let k = 0; k < friendLikes[j].length; k++){
// 				returnString += ` ${friendLikes[j][k]}`
// 			}
// 		} else {
// 			if(j === friendLikes.length - 1) {
// 				returnString += ` & ${friendLikes[j]} `
// 			} else {
// 				returnString += ` ${friendLikes[j]} `
// 			}
// 		}
// 	}
	 
// 	console.log('----------',returnString)
// }