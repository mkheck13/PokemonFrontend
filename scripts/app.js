
// Variables
// let data;


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
// document.addEventListener('DOMContentLoaded', async function () {
//     await PokemonApi('pikachu');
    
// });

// Input Field



// Search Button
// searchBtn.addEventListener('click', async () => {

//     await PokemonApi(inputField.value.toLowerCase());

//     popultePokemon();
// });



// Random Button
// randomBtn.addEventListener('click', async () => {
//     let randomId = Math.floor(Math.random() * 650);
//     await PokemonApi(randomId);
//     popultePokemon();

// })



// Fetch Pokemon
const PokemonApi = async (pokemon) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await promise.json();

    pokemonName.innerText = data.name;

    return data;
};

searchBtn.addEventListener('click', () => {
    PokemonApi(pokemon.value.toLowerCase());
})




