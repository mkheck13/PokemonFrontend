// Import
import { SaveToLocal, GetLocal, RemoveFromLocal } from "./localstorage.js";


// Variables

// Background Change
let backgroundChange = document.getElementById('backgroundChange');

// Pokemon ID's
let pokeName = document.getElementById('pokeName');
let pokeId = document.getElementById('pokeId');
let pokeImage = document.getElementById('pokeImage');


let pokeType = document.getElementById('pokeType');
let pokeLocation = document.getElementById('pokeLocation');
let pokeAbilities = document.getElementById('pokeAbilities');
let pokeMoves = document.getElementById('pokeMoves');
let pokeEvo = document.getElementById('pokeEvo');

//Buttons and field
let inputField = document.getElementById('inputField');
let searchBtn = document.getElementById('searchBtn');
let randomBtn = document.getElementById('randomBtn');
let favIcon = document.getElementById('favIcon');
let shinyBtn = document.getElementById('shinyBtn');
let sparkleIcon = document.getElementById('sparkleIcon');

let favDiv = document.getElementById('favDiv');

let shiny = false;

let shinePoke = '';
let dullPoke = '';

let pokeData;

// let userSearch = "mew";



// Search Button
searchBtn.addEventListener('click', async () => {
        console.log("test");
        
    try {


        let userSearch = inputField.value.toLowerCase();
        console.log(userSearch);
        
        pokeData = await PokemonApi(userSearch);
        console.log(pokeData.id)

        if (pokeData.id < 650) {

            // Console Logs
            // console.log(pokeData.name);
            // console.log(pokeData.id);
            // console.log(pokeData.types.map(type => type.type.name));
            // console.log(pokeData.abilities.map(ability => ability.ability.name));

            // name
            pokeName.textContent = `${pokeData.name}`;

            // Id
            pokeId.textContent = `# ${pokeData.id}`;

            // Image
            pokeImage.src = pokeData.sprites.other["official-artwork"].front_default;

            // Type
            const typeArray = pokeData.types.map(type => type.type.name);
            pokeType.textContent = `Type: ${typeArray.join(', ')}`;

            // Location
            const locationData = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}/encounters`);
            const location = await locationData.json();
            // console.log(location);

            if (location.length > 0) {
                let randomLocation = Math.floor(Math.random() * location.length);
                pokeLocation.textContent = `Location: ${(location[randomLocation].location_area.name).replaceAll("-", " ")}`;
            } else {
                pokeLocation.textContent = "Location: N/A";
            }

            // Abilities
            const abilityArray = pokeData.abilities.map(ability => ability.ability.name);
            pokeAbilities.textContent = `Abilities: ${abilityArray.join(', ')}`;

            // Moves
            const movesArray = pokeData.moves.map(move => move.move.name);
            pokeMoves.textContent = `Moves: ${movesArray.join(', ')}`;

        } else {
            alert("Please enter a valid Pokemon name or ID. Gen 1-5 / ID 1-649");
        }

    } catch (error) {
        alert("Please enter a valid Pokemon name or ID. Gen 1-5 / ID 1-649");
        inputField.value = "";
    }

});

// Shiney button
shinyBtn.addEventListener("click", () => {
    if(pokeImage.src == dullPoke){
        pokeImage.src = shinePoke;
    }else{
        pokeImage.src = dullPoke;
    }
});


// Random Button
randomBtn.addEventListener('click', async () => {

    let randomNum = Math.floor(Math.random() * 650);
    let pokeData = await PokemonApi(randomNum);

    // name
    pokeName.textContent = `${pokeData.name}`;

    // Id
    pokeId.textContent = `# ${pokeData.id}`;

    // Image
    pokeImage.src = pokeData.sprites.other["official-artwork"].front_default;

    // Type
    const typeArray = pokeData.types.map(type => type.type.name);
    pokeType.textContent = `${typeArray.join(', ')}`;

    // Location
    const locationData = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}/encounters`);
    const location = await locationData.json();
    //    console.log(location);

    if (location.length > 0) {
        let randomLocation = Math.floor(Math.random() * location.length);
        pokeLocation.textContent = `${(location[randomLocation].location_area.name).replaceAll("-", " ")}`;
    } else {
        pokeLocation.textContent = "N/A";
    }

    // Abilities
    const abilityArray = pokeData.abilities.map(ability => ability.ability.name);
    pokeAbilities.textContent = `${abilityArray.join(', ')}`;

    // Moves
    const movesArray = pokeData.moves.map(move => move.move.name);
    pokeMoves.textContent = `${movesArray.join(', ')}`;

});



// Fetch Pokemon Data
const PokemonApi = async (userSearch) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    const data = await promise.json();
    console.log(data)

    // setting normal and shiny images
    shinePoke = data.sprites.other["official-artwork"].front_shiny;
    dullPoke = data.sprites.other["official-artwork"].front_default;

    pokeImage.src = dullPoke;



    // Evolution Chain
    const evoGet = await fetch(`${data.species.url}`)
    const evoData = await evoGet.json();

    const evoChain = await fetch(`${evoData.evolution_chain.url}`);
    const evoChainData = await evoChain.json();

    if (evoChainData.chain.evolves_to.length === 0) {
        pokeEvo.textContent = "No Evolutions";
    } else {
        const evoArray = [evoChainData.chain.species.name];

        const seeEvo = chain => {
            if (chain.evolves_to.length === 0) {
                return;
            } else {
                chain.evolves_to.forEach(evo => {
                    evoArray.push(evo.species.name);
                    seeEvo(evo);
                })
            }
        }
        seeEvo(evoChainData.chain);
        pokeEvo.textContent = `${evoArray.join(' - ')}`;
    }

    inputField.value = "";

    return data;
};


// OnLoad
// const OnLoad = async() => {

//     pokeName.textContent = `${pokeData.name}`;
// }



// BackGround Colors
const backGroundColor = {
    normal: 'bg-normal',
    fire: 'bg-fire',
    water: 'bg-water',
    electric: 'bg-electric',
    grass: 'bg-grass',
    ice: 'bg-ice',
    fighting: 'bg-fighting',
    poison: 'bg-poison',
    ground: 'bg-ground',
    flying: 'bg-flying',
    psychic: 'bg-psychic',
    bug: 'bg-bug',
    rock: 'bg-rock',
    ghost: 'bg-ghost',
    dragon: 'bg-dragon',
    dark: 'bg-dark',
    steel: 'bg-steel',
    fairy: 'bg-fairy',
};

// Heart Button
favIcon.addEventListener('click', () => {
    const favData = localStorage.getItem("favorited");

    if(favData && favData.includes(userSearch.name)){
        saved = true;
        RemoveFromLocal(userSearch.name);
    }else{
        saved = false;
        SaveToLocal(userSearch.name)
    }
});


// Favorite Modal
favBtn.addEventListener('click', () => {
    let favorites = GetLocal();

    favDiv.textContent = "";

    favorites.map(favPoke => {

        let div = document.createElement('div');
        div.className = "grid grid-col-2 my-5 py-1 ps-2 rounded-2xl items-center"

        let p = document.createElement('p');
        p.textContent = favPoke.charAt(0).toUpperCase() + favPoke.slice(1);
        p.className = "col-span-1 text-blue-800 text-3xl";

        let span = document.createElement('span');
        span.textContent = "Remove"
        span.className = "col-span-1 text-center text-red-700"

        span.addEventListener('click', () => {
            RemoveFromLocal(favPoke);
            div.remove();
        })
    })
});