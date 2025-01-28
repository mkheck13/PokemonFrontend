
// Variables

// Background Change
let backgroundChange = document.getElementById('backgroundChange');

// Pokemon ID's
let pokemonName = document.getElementById('pokemonName');
let pokeId = document.getElementById('pokeId');
let pokeImage = document.getElementById('pokeImage');

//Buttons and field
let inputField = document.getElementById('inputField');
let searchBtn = document.getElementById('searchBtn');
let randomBtn = document.getElementById('randomBtn');
let favIcon = document.getElementById('favIcon');
let shinyBtn = document.getElementById('shinyBtn');


// Event Listeners
document.addEventListener('DOMContentLoaded', async function () {
    await PokemonApi(1);
    current
});

// Input Field



// Search Button



// Random Button



// Favourite Button


// Shiny Button



// Functions


// Fetch Pokemon
const PokemonApi = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();

    pokemonName.textContent = data.name;

    pokeId.textContent = data.id.toString().padStart(3, '0');

    pokeImage.src = data.sptites.other["official-artwork"].front_default;

    return data;

};





// Fetch Random Pokemon


// Fetch Shiny Pokemon


// Fetch Favourite Pokemon


// Fetch Pokemon By Name


// Fetch Pokemon By ID

