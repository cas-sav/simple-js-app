let pokemonRepository = (function () {	

	let pokemonList = [
		{	name: 'Vulpix',
			height: 0.6,
			types: ['Fire']
		},

		{	name: 'Moltres',
			height: 2,
			types: ['Fire', 'Flying']
		},

		{	name: 'Doduo',
			height: 1.4,
			types: ['Flying', 'Fire']
		}
	];

	function add(item) {
		pokemonList.push(item);
	}

	function getAll() {
		return pokemonList;
	}

	return {
		add: add,
		getAll: getAll
	}

})() //end of repository


pokemonRepository.getAll().forEach(function(pokemon) {
   
	if (pokemon.height > 1.5) {
		document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ") " + "- Wow, that's big!" + "</p>");
	} else {
		document.write(pokemon.name + " (height: " + pokemon.height + ") ");
	}

});

