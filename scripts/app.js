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

// let userSearch = "mew";



// Search Button
searchBtn.addEventListener('click', async () => {
        console.log("test");
        
    try {


        let userSearch = inputField.value.toLowerCase();
        console.log(userSearch);
        
        let pokeData = await PokemonApi(userSearch);
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

            // Shiny Button NEEDS WORK!!!
            shinyBtn.addEventListener('click', async () => {
                console.log("shiny button clicked");

                if (shiny) {
                    pokeImage.src = pokeData.sprites.other["official-artwork"].front_shiny;
                } else {
                    pokeImage.src = pokeData.sprites.other["official-artwork"].front_default;
                }
                shiny = !shiny;
            });

        } else {
            alert("Please enter a valid Pokemon name or ID. Gen 1-5 / ID 1-649");
        }

    } catch (error) {
        alert("Please enter a valid Pokemon name or ID. Gen 1-5 / ID 1-649");
        inputField.value = "";
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

    // Shiny Button NEEDS WORK!!!
    shinyBtn.addEventListener('click', async () => {
        console.log("shiny button clicked");

        if (shiny) {
            pokeImage.src = pokeData.sprites.other["official-artwork"].front_shiny;
        } else {
            pokeImage.src = pokeData.sprites.other["official-artwork"].front_default;
        }
        shiny = !shiny;
    });

});


// Fetch Pokemon Data
const PokemonApi = async (userSearch) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    const data = await promise.json();
    console.log(data)



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

