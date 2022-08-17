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


for (let i = 0; i < pokemonList.length; i++) {
   
	if (pokemonList[i].height > 1.5) {
		document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") " + "- Wow, that's big!");
	} else {
		document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ");
	}

}