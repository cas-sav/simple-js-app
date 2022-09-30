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

	

	function getAll() {
		return pokemonList;
	};

	function addListItem(pokemon) {

		let pokemonUnorder = document.querySelector('.pokemon-list');

		let listItem = document.createElement('li');

		let button = document.createElement('button');
		button.innerText = pokemon.name;

		button.classList.add('button-class');

		listItem.appendChild(button);
		pokemonUnorder.appendChild(listItem);

		button.addEventListener('click', ()=>{ showDetails(pokemon);});
		
	};

	function showDetails(pokemon) {
		console.log(pokemon);
	};

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem
	};


})() //end of repository (IIFE)



pokemonRepository.getAll().forEach(function(pokemon) {

   pokemonRepository.addListItem(pokemon);

});




//if (pokemon.height > 1.5) {
//		document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ") " + "- Wow, that's big!" + "</p>");
//	} else {
//		document.write(pokemon.name + " (height: " + pokemon.height + ") ");
//	}