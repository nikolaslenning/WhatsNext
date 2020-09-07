// Variables that hold our AJAX request information 
let savedcards = []
savedcards = JSON.parse(localStorage.getItem("movieCardList"))
// console.log(savedcards)
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
		var cardBox = $('#swiper-wrapper-coming');
		//variable that takes slice of ajax info from index 0 to 99
		var arraySlice = newResponse.ITEMS.slice(0, 99)

		//  save card active
		var arraySlice

		arraySlice.forEach(function (currentElement, index, array) {
			//create containers to hold information being returned
			var movieCardDiv = $('<div>');
			var dropDownContainer = $('<div uk-modal>');
			var dropDownDiv = $('<div>');
			var titleDiv = $('<h3>');
			var typeDiv = $('<p>');
			var runtimeDiv = $('<p>');
			var synopsisDiv = $('<p>');
			var imageDiv = $('<img>');
			var movieTitle = currentElement.title;

			let savebtn = $('<button>');
			let breaks = $('<br>');
			let moreBtn = $('<button>');
			const apostrophe = /&#39/gi;
			var saveIcon = $('<i>');

			//adding class to container that will house all the little information containers
			// dynamically adding infomation recieved from ajax request to containors created above
			movieCardDiv.attr('class', "swiper-slide uk-card uk-card-default uk-card-body");
			titleDiv.text('Title: ' + currentElement.title); //
			// titleDiv.replace(apostrophe, "'");
			// console.log(currentElement.title);
			typeDiv.text('Type: ' + currentElement.type);
			runtimeDiv.text("Runtime: " + currentElement.runtime);
			synopsisDiv.html('Synopsis: ' + currentElement.synopsis);
			imageDiv.attr('src', currentElement.image);

			//dropDownContainer.attr('class', 'uk-inline')
			dropDownDiv.attr('class', 'uk-modal-dialog uk-modal-body');
			dropDownContainer.attr('id', 'modal-id');
			
			
			moreBtn.attr('type', 'button');
			moreBtn.attr('uk-toggle', 'target: #modal-id');
			moreBtn.text('More Info');
			saveIcon.attr('uk-icon', 'floppy-o');

			// appending containers housing info from ajax request to one container, then append that container to the carousel container swiper-wrapper
			movieCardDiv.append(imageDiv);
			movieCardDiv.append(titleDiv);
			movieCardDiv.append(synopsisDiv);

			
			dropDownContainer.append(dropDownDiv);
			dropDownDiv.append(typeDiv);
			dropDownDiv.append(runtimeDiv);
			cardBox.append(movieCardDiv);

			savebtn.append(saveIcon);
			movieCardDiv.append(savebtn);
			movieCardDiv.append(breaks);
			movieCardDiv.append(moreBtn);
			movieCardDiv.append(dropDownContainer);
			// step one make btn

			savebtn.text('Save');
			$(savebtn).on("click", function () {


				if (!savedcards.find(mov => mov.netflixid === currentElement.netflixid)) {
					savedcards.push(currentElement)
				}
				// get text from wawa 
				// text area is saved in local storage

				localStorage.setItem("movieCardList", JSON.stringify(savedcards))
			})
			// data is retreved and displayed in textarea

			// step two link to on click
			// step three save to storage 
			// step 4 pull on to new page

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
				dropDownDiv.append(boxMPAA);
				dropDownDiv.append(boxOriginCountry);
				movieCardDiv.append(boxCriticRating);
				//runtimeDiv.append(runtimeOMDB); // not sure if needed or a way to not display if result is N/A

				// console.log(responseOMDB);
				// console.log(criticRating);
				// console.log(originCountry);
				for (var i = 0; i < criticRating.length; i++) {
					var ratingDiv = $('<div>');
					var criticResponse = responseOMDB.Ratings[i];
					//var ratingSource = criticResponse.Source;
					//var ratingValue = criticResponse.Value
					// console.log('criticResponse', '---------', criticResponse);
					//ratingDiv.text(`Critic Rating: ${ratingValue} from ${ratingSource}`);
					if (criticRating[i].Source === "Internet Movie Database") {
						var imdbIcon = $("<img>");
						imdbIcon.attr("src", "./assets/IMG/imdb_logo.jpeg").addClass("IMDBIcon");
						var imdbNode = $("<div>").html(imdbIcon);
						var imdbNodeText = criticRating[i].Value;
						boxCriticRating.append(imdbNode);
						imdbNode.append(imdbNodeText);
						imdbNode.attr('class', 'uk-column-1-3');
					} 
					else if (criticRating[i].Source === "Rotten Tomatoes") {
						var rottenTomIcon = $('<img>');
						rottenTomIcon.attr('src', './assets/IMG/tomato.png').addClass('RTIcon')
						var tomatoNode = $('<div>').html(rottenTomIcon);
						var tomatoNodeText = criticRating[i].Value;
						boxCriticRating.append(tomatoNode);
						tomatoNode.append(tomatoNodeText);
						tomatoNode.attr('class', 'uk-column-1-3');
					} 
					else if (criticRating[i].Source === "Metacritic") {
						var metaIcon = $('<img>');
						metaIcon.attr('src', './assets/IMG/metacritic.png').addClass("metaIcon");
						var metaNode = $('<div>').html(metaIcon);
						var metaNodeText = criticRating[i].Value;
						boxCriticRating.append(metaNode);
						metaNode.append(metaNodeText);
						metaNode.attr('class', 'uk-column-1-3');
					}
					movieCardDiv.append(ratingDiv);
				}

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

	$.ajax(expireSettings).done(function (expireResponse) {
		// console.log(expireResponse);
		var cardBox = $('#swiper-wrapper-going');
		var arraySlice = expireResponse.ITEMS.slice(0, 99)

		arraySlice.forEach(function (currentElement, index, array) {
			// console.log(currentElement);
			// console.log(currentElement.title);
			// console.log(newResponse.ITEMS);
			var movieCardDiv = $('<div>');
			var dropDownContainer = $('<div uk-modal>');
			var dropDownDiv = $('<div>');
			var titleDiv = $('<h3>');
			var typeDiv = $('<p>');
			var runtimeDiv = $('<p>');
			var synopsisDiv = $('<p>');
			var imageDiv = $('<img>');
			var movieTitle = currentElement.title

			let savebtn = $('<button>');
			let breaks = $('<br>');
			let moreBtn = $('<button>');

			movieCardDiv.attr('class', 'swiper-slide uk-card uk-card-default uk-card-body');
			titleDiv.text('Title: ' + currentElement.title);
			// console.log(currentElement.title);
			typeDiv.text('Type: ' + currentElement.type);
			runtimeDiv.text("Runtime: " + currentElement.runtime);
			synopsisDiv.html('Synopsis: ' + currentElement.synopsis);
			imageDiv.attr('src', currentElement.image);

			//dropDownContainer.attr('class', 'uk-inline')
			dropDownDiv.attr('class', 'uk-modal-dialog uk-modal-body');
			dropDownContainer.attr('id', 'modal-id');


			moreBtn.attr('type', 'button');
			moreBtn.text('More Info')
			moreBtn.attr('uk-toggle', 'target: #modal-id');

			movieCardDiv.append(imageDiv);
			movieCardDiv.append(titleDiv);
			movieCardDiv.append(synopsisDiv);

			dropDownContainer.append(dropDownDiv);
			dropDownDiv.append(typeDiv);
			dropDownDiv.append(runtimeDiv);
			cardBox.append(movieCardDiv);
			
			movieCardDiv.append(savebtn)
			movieCardDiv.append(breaks);
			movieCardDiv.append(moreBtn);
			movieCardDiv.append(dropDownContainer);
			// step one make btn


			savebtn.text('Save')
			$(savebtn).on("click", function () {


				if (!savedcards.find(mov => mov.netflixid === currentElement.netflixid)) {
					savedcards.push(currentElement)
				}

				// get text from wawa 
				// text area is saved in local storage

				localStorage.setItem("movieCardList", JSON.stringify(savedcards))
			})

			var queryURL = "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy";
			$.ajax({
				url: queryURL,
				method: "GET"
			}).then(function (responseOMDB) {
				var MPAArating = responseOMDB.Rated;
				var originCountry = responseOMDB.Country;
				var criticRating = responseOMDB.Ratings

				var boxMPAA = $('<p>');
				var boxOriginCountry = $('<p>');
				var boxCriticRating = $('<div>');

				boxMPAA.text('Rated: ' + MPAArating);
				boxOriginCountry.text('Country: ' + originCountry);
				//boxCriticRating.text('Critic Rating: ' + JSON.stringify(criticRating));

				dropDownDiv.append(boxMPAA);
				dropDownDiv.append(boxOriginCountry);
				movieCardDiv.append(boxCriticRating);

				// console.log(responseOMDB);
				// console.log(criticRating);
				// console.log(originCountry);
				for (var i = 0; i < criticRating.length; i++) {
					var ratingDiv = $('<div>');
					var criticResponse = responseOMDB.Ratings[i];
					//var ratingSource = criticResponse.Source;
					//var ratingValue = criticResponse.Value
					// console.log('criticResponse', '---------', criticResponse);
					//ratingDiv.text(`Critic Rating: ${ratingValue} from ${ratingSource}`);
					if (criticRating[i].Source === "Internet Movie Database") {
						var imdbIcon = $("<img>");
						imdbIcon.attr("src", "./IMG/imdb_logo.jpeg").addClass("IMDBIcon");
						var imdbNode = $("<div>").html(imdbIcon);
						var imdbNodeText = criticRating[i].Value;
						boxCriticRating.append(imdbNode);
						imdbNode.append(imdbNodeText);
						imdbNode.attr('class', 'uk-column-1-3');
					} 
					else if (criticRating[i].Source === "Rotten Tomatoes") {
						var rottenTomIcon = $('<img>');
						rottenTomIcon.attr('src', './IMG/tomato.png').addClass('RTIcon')
						var tomatoNode = $('<div>').html(rottenTomIcon);
						var tomatoNodeText = criticRating[i].Value;
						boxCriticRating.append(tomatoNode);
						tomatoNode.append(tomatoNodeText);
						tomatoNode.attr('class', 'uk-column-1-3');
					} 
					else if (criticRating[i].Source === "Metacritic") {
						var metaIcon = $('<img>');
						metaIcon.attr('src', './IMG/metacritic.png').addClass("metaIcon");
						var metaNode = $('<div>').html(metaIcon);
						var metaNodeText = criticRating[i].Value;
						boxCriticRating.append(metaNode);
						metaNode.append(metaNodeText);
						metaNode.attr('class', 'uk-column-1-3');
					}
					movieCardDiv.append(ratingDiv);
				}
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
};

//Calling pull function the start the ajax requests above

pull();