
// Set API in carousel
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

// function pull() {
// 	$.ajax(newSettings).done(function (newResponse) {

// 		var cardBox = $('#coming-card-box');
// 		var arraySlice = newResponse.ITEMS.slice(0, 90)
// 		arraySlice.forEach(function (currentElement, index, array) {
// 			console.log(currentElement);
// 			console.log(currentElement.title);
// 			// console.log(newResponse.ITEMS);
// 			var movieCardDiv = $('<div>');
// 			var titleDiv = $('<h3>');
// 			var typeDiv = $('<p>');
// 			var runtimeDiv = $('<p>');
// 			var synopsisDiv = $('<p>');
// 			var imageDiv = $('<img>');
// 			var movieTitle = currentElement.title;

// 			movieCardDiv.attr('class', "uk-card uk-card-default");
// 			titleDiv.text('Title: ' + currentElement.title);
// 			console.log(currentElement.title);
// 			typeDiv.text('Type: ' + currentElement.type);
// 			runtimeDiv.text("Runtime: " + currentElement.runtime);
// 			synopsisDiv.html('Synopsis: ' + currentElement.synopsis);
// 			imageDiv.attr('src', currentElement.image);

// 			movieCardDiv.append(imageDiv);
// 			movieCardDiv.append(titleDiv);
// 			movieCardDiv.append(typeDiv);
// 			movieCardDiv.append(runtimeDiv);
// 			movieCardDiv.append(synopsisDiv);
// 			cardBox.append(movieCardDiv);

// 			var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";
// 			$.ajax({
// 				url: queryURL,
// 				method: "GET"
// 			}).then(function (responseOMDB) {
// 				var MPAArating = responseOMDB.Rated;
// 				var originCountry = responseOMDB.Country;
// 				var criticRating = responseOMDB.Ratings
// 				var runtimeOMDB = responseOMDB.Runtime // not sure if needed or a way to not display if result is N/A

// 				var boxMPAA = $('<p>');
// 				var boxOriginCountry = $('<p>');
// 				var boxCriticRating = $('<p>');

// 				boxMPAA.text('MPAA Rating: ' + MPAArating);
// 				boxOriginCountry.text('Country: ' + originCountry);
// 				boxCriticRating.text('Critic Rating: ' + JSON.stringify(criticRating));
				
// 				movieCardDiv.append(boxMPAA);
// 				movieCardDiv.append(boxOriginCountry);
// 				movieCardDiv.append(boxCriticRating);
// 				runtimeDiv.append(runtimeOMDB); // not sure if needed or a way to not display if result is N/A
				
// 				console.log(responseOMDB);
// 				console.log(criticRating);
// 				console.log(originCountry);
// 			});
// 		});
// 	});



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

// };
pull();

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
  virtual: {
	slides: (function () {
	  var slides = [];
	  for (var i = 0; i < 600; i += 1) {
		slides.push('Slide ' + (i + 1));
	  }
	  return slides;
	}()),
  },
});
document.querySelector('.slide-1').addEventListener('click', function (e) {
	e.preventDefault();
	swiper.slideTo(0, 0);
  });
  document.querySelector('.slide-250').addEventListener('click', function (e) {
	e.preventDefault();
	swiper.slideTo(249, 0);
  });
  document.querySelector('.slide-500').addEventListener('click', function (e) {
	e.preventDefault();
	swiper.slideTo(499, 0);
  });
  document.querySelector('.prepend-2-slides').addEventListener('click', function (e) {
	e.preventDefault();
	swiper.virtual.prependSlide([
	  'Slide ' + (--prependNumber),
	  'Slide ' + (--prependNumber)
	]);
  });
  document.querySelector('.append-slide').addEventListener('click', function (e) {
	e.preventDefault();
	swiper.virtual.appendSlide('Slide ' + (++appendNumber));
  });




