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
		    let button = document.createElement("button");
		    button.innerText = pokemon.name;
		    button.classList.add("button-class");
		    listpokemon.appendChild(button);
		    pokemonList.appendChild(listpokemon);
		    button.addEventListener("click", function(event) {
		      showDetails(pokemon);
		    });
	}

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
	      item.imageUrl = details.sprites.front_default;
	      item.height = details.height;
	      item.types = details.types;
	    }).catch(function (e) {
	      console.error(e);
	    });
	  }

	  function showDetails(pokemon) {
		loadDetails(pokemon).then(function() {
			showModal(pokemon);
		})
	  };

	  // START OF MODAL 

	  function showModal(pokemon) {
	    modalContainer.innerHTML = '';
	    let modal = document.createElement('div');
	    modal.classList.add('modal');

	    let closeButtonElement = document.createElement('button');
	    closeButtonElement.classList.add('modal-close');
	    closeButtonElement.innerText = 'Close';
	    closeButtonElement.addEventListener('click', hideModal);

	    let pokemonNameElement = document.createElement('h1');
	    pokemonNameElement.innerText = pokemon.name;

	    let pokemonImageElement = document.createElement('img');
	    pokemonImageElement.src = pokemon.imageUrl;

	    let pokemonHeightElement = document.createElement('p');
	    pokemonHeightElement.innerText = pokemon.name + "'s" + " " + " height is " + pokemon.height;


	    modal.appendChild(closeButtonElement);
	    modal.appendChild(pokemonNameElement);
	    modal.appendChild(pokemonImageElement);
	    modal.appendChild(pokemonHeightElement);
	    modalContainer.appendChild(modal);
	    
	    modalContainer.classList.add('is-visible');
	  }

	  window.addEventListener('keydown', (e) => {
	    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
	      hideModal();  
	    }
	  });

	  function hideModal() {
	    modalContainer.classList.remove('is-visible');
	  }
	  
	  modalContainer.addEventListener('click', (e) => {
	    // Since this is also triggered when clicking INSIDE the modal
	    // We only want to close if the user clicks directly on the overlay
	    let target = e.target;
	    if (target === modalContainer) {
	      hideModal();
	    }
	  });

	

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