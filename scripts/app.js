// Import
import { SaveToLocal, GetLocal, RemoveFromLocal } from "./localstorage.js";

// Variables

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

let shinePoke = '';
let dullPoke = '';

let pokeData;

let saved = false;
let saveArr = {};

// let userSearch = "mew";



// Search Button
searchBtn.addEventListener('click', async () => {


    try {


        let userSearch = inputField.value.toLowerCase();


        pokeData = await PokemonApi(userSearch);


        if (pokeData.id < 650) {

            // name
            pokeName.textContent = `${pokeData.name}`;

            // Id
            pokeId.textContent = `# ${pokeData.id}`;

            // Image
            if (pokeData.id == "143") {
                pokeImage.src = "../assets/superChunk.jpg";
            } else {
                pokeImage.src = pokeData.sprites.other["official-artwork"].front_default;
            }

            // Type
            const typeArray = pokeData.types.map(type => type.type.name);
            pokeType.textContent = `Type: ${typeArray.join(', ')}`;

            // Location
            const locationData = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}/encounters`);
            const location = await locationData.json();

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
    if (pokeImage.src == dullPoke) {
        pokeImage.src = shinePoke;
    } else {
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

    if (data.id < 650) {

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

    } else {
        console.log("nothing")
    }


    inputField.value = "";

    showFavs();

    return data;
};


// Pokemon On Load
const LoadedPoke = async () => {
    pokeData = await PokemonApi("234");
    // name
    pokeName.textContent = `${pokeData.name}`;
    // Id
    pokeId.textContent = `# ${pokeData.id}`;
    // Type
    const typeArray = pokeData.types.map(type => type.type.name);
    pokeType.textContent = `Type: ${typeArray.join(', ')}`;
    // Location
    const locationData = await fetch(`https://pokeapi.co/api/v2/pokemon/234/encounters`);
    const location = await locationData.json();
    if (location.length > 0) {
        let randomLocation = Math.floor(Math.random() * location.length);
        pokeLocation.textContent = `Location: ${(location[randomLocation].location_area.name).replaceAll("-", " ")}`;
    } else {
        pokeLocation.textContent = "Location: N/A";
    };
    // Abilities
    const abilityArray = pokeData.abilities.map(ability => ability.ability.name);
    pokeAbilities.textContent = `Abilities: ${abilityArray.join(', ')}`;
    // Moves
    const movesArray = pokeData.moves.map(move => move.move.name);
    pokeMoves.textContent = `Moves: ${movesArray.join(', ')}`;
    //Shiny caked deer on load
    pokeImage.src = shinePoke;

}
LoadedPoke();


// Local storage
function isSaved(pokeName) {
    const favorites = GetLocal();
    return favorites.includes(pokeName);
};

// Heart Button
favIcon.addEventListener('click', () => {
    const pokemonName = pokeName.textContent;
    if (!isSaved(pokemonName)) {
        SaveToLocal(pokemonName);

    } else {
        RemoveFromLocal(pokemonName);

    }
    showFavs();
});

// Displaying the Favorite Data
function showFavs() {
    const storeFavs = GetLocal();

    favDiv.innerHTML = '';

    for (const pokemon of storeFavs) {
        const p = document.createElement('p');
        const remove = document.createElement('button');
        remove.innerText = "X";
        remove.className = "m-3";

        remove.addEventListener('click', () => {
            RemoveFromLocal(pokemon);

            if (pokemon === pokeName) {
                console.log("in here")
            }
            showFavs();
        });

        p.className = "text-center text-2xl text-black";
        p.textContent = pokemon;
        p.appendChild(remove);
        favDiv.appendChild(p);
    }
};

// showFavs();
