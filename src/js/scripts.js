let pokemonRepository = (function () {	

	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	let modalContainer = document.querySelector('#modal-container');

  // Other functions remain here
 
	function add(pokemon) {
	    if (
	      typeof pokemon === "object" &&
	      "name" in pokemon //&& "detailsUrl" in pokemon
	    ) {
	      pokemonList.push(pokemon);
	    } else {
	      console.log("pokemon is not correct");
	    }
	  }

	function getAll() {
			return pokemonList;
		};

	function addListItem(pokemon) {
		let pokemonList = document.querySelector(".pokemon-list");
		    let listpokemon = document.createElement("li");
		    listpokemon.classList.add("group-list-item")
		    let button = document.createElement("button");
		    button.innerText = pokemon.name;
		    button.classList.add("button-class");
		    button.setAttribute("data-toggle", "modal");
		    button.setAttribute("data-target", "#modal-container");
		    button.classList.add("btn");
		    listpokemon.appendChild(button);
		    pokemonList.appendChild(listpokemon);
		    button.addEventListener("click", function(event) {
		      showDetails(pokemon);
			});
	};

	  function loadList() {
	    return fetch(apiUrl).then(function (response) {
	      return response.json();
	    }).then(function (json) {
	      json.results.forEach(function (item) {
	        let pokemon = {
	          name: item.name,
	          detailsUrl: item.url
	        };
	        add(pokemon);
	        console.log(pokemon);
	      });
	    }).catch(function (e) {
	      console.error(e);
	    })
	  }


	  function loadDetails(item) {
	    let url = item.detailsUrl;
	    return fetch(url).then(function (response) {
	      return response.json();
	    }).then(function (details) {
	      // Now we add the details to the item
	      item.imageUrlFront = details.sprites.front_default;
	      item.imageUrlBack = details.sprites.back_default;
	      item.height = details.height;
	      item.weight = details.weight;
	      item.types = [];
	        for (var i = 0; i < details.types.length; i++) {
	          item.types.push(details.types[i].type.name);
	        };
		  item.abilities = [];
	        for (var i = 0; i < details.abilities.length; i++) {
	          item.abilities.push(details.abilities[i].ability.name);
	        };

	    }).catch(function (e) {
	      console.error(e);
	    });
	  }

	  function showDetails(pokemon) {
		loadDetails(pokemon).then(function() {
			console.log(pokemon);
			showModal(pokemon);
		})
	  };

	  // START OF MODAL 

	  function showModal(pokemon) {
	    let modalBody = $(".modal-body");
	    let modalTitle = $(".modal-title");
	    let modalHeader = $(".modal-header");

	    modalTitle.empty();
	    modalBody.empty();

	    // creating element for name in modal content
	    let pokemonNameElement = $("<h1>" + pokemon.name + "</h1>");
	    // creating img in modal content
	    let pokemonImageFront = $('<img class="modal-img" style="width:50%">');
	    pokemonImageFront.attr("src", pokemon.imageUrlFront);
	    	// back image
	    let pokemonImageBack = $('<img class="modal-img" style="width:50%">');
	    pokemonImageBack.attr("src", pokemon.imageUrlBack);
	    // creating element for height in modal content
	    let pokemonHeightElement = $("<p>" + "height : " + pokemon.height + "</p>");
	    // creating element for weight in modal content
	    let pokemonWeightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
	    // creating element for types in modal content
	    let pokemonTypesElement = $("<p>" + "types : " + pokemon.types + "</p>");
	    // creating element for abilities in modal content
	    let pokemonAbilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>"); 


	    modalTitle.append(pokemonNameElement);
	    modalBody.append(pokemonImageFront);
	    modalBody.append(pokemonImageBack);
	    modalBody.append(pokemonHeightElement);
	    modalBody.append(pokemonWeightElement);
	    modalBody.append(pokemonTypesElement);
	    modalBody.append(pokemonAbilitiesElement);

	  }

	  // END OF MODAL

	  return {
	    add: add,
	    getAll: getAll,
	    addListItem: addListItem,
	    loadList: loadList,
	    loadDetails: loadDetails,
	    showDetails: showDetails
	  };

	})(); // end of repository

	pokemonRepository.loadList().then(function() {
	  // Now the data is loaded!
	  pokemonRepository.getAll().forEach(function(pokemon){
	    pokemonRepository.addListItem(pokemon);
	  });
	});