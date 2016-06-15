var recipeFinder = function() {
	$(document).ready(function() {
		console.log("just testing");
		$.ajax({
			accepts: {
			    json: 'application/json'
			},
			type: 'GET',			
			url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients",
			data: {'fillIngredients' : 'true', 'ingredients' : "pasta", 'limitLicense' : 'true', 'ranking' : '1'},
			dataType: 'text',
			settings: ["X-Mashape-Key", "l7YpdDzhoamshuXva1pIFF8QPDRPp11xpC2jsnDsIlvbSdvNpH"],
			beforeSend: function(xhr) {
			    xhr.setRequestHeader("X-Mashape-Authorization", "3Qe8uPoiRtmshyKgwgRxKSuEEDgWp127Z4vjsn4qTjX2GB0ji2");
			},
			success: function(data, textStatus, jqXHR) {

				var jsonData = JSON.parse(data);
				var results = $('.recipeFinder-results');
				results.html('');
				for (var i = 0; i < jsonData.length; i++) {
					var jsonDataElement = jsonData[i];
					var result = $('<div class="recipeFinder-results-result">');
					var title = $('<div class="recipeFinder-results-title">').text(jsonDataElement.title);
					var image = $('<img src="'+ jsonDataElement.image + '" width="100" height="100"/>');
					var ingredients = $('<div>').text("Ingredients").append('<ul>').append('<li>' + jsonDataElement.usedIngredients[0].name + '</li>');
					
					for (var x = 0; x < jsonDataElement.missedIngredients.length; x++) {
						ingredients.append('<li>' + jsonDataElement.missedIngredients[x].name + '</li>');
					}
					result.append(title).append(image).append(ingredients);
				    results.append(result);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			}
		});
	});	
}