
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

// let shiny;

// let userSearch = "mew";




// Search Button
searchBtn.addEventListener('click', async () => {
    userSearch = inputField.value.toLowerCase();
    let pokeData = await PokemonApi(userSearch);

    
    
    // Console Logs
    console.log(pokeData.name);
    console.log(pokeData.id);
    console.log(pokeData.types.map(type => type.type.name));
    console.log(pokeData.abilities.map(ability => ability.ability.name));

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
    console.log(location);

    if(location.length > 0){
        let randomLocation = Math.floor(Math.random() * location.length);
        pokeLocation.textContent = `Location: ${(location[randomLocation].location_area.name).replaceAll("-", " ")}`;
    }else{
        pokeLocation.textContent = "Location: N/A";
    }

    // Abilities
    const abilityArray = pokeData.abilities.map(ability => ability.ability.name);
    pokeAbilities.textContent = `Abilities: ${abilityArray.join(', ')}`;

    // Moves
    const movesArray = pokeData.moves.map(move => move.move.name);
    pokeMoves.textContent = `Moves: ${movesArray.join(', ')}`;










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
   console.log(location);

   if(location.length > 0){
       let randomLocation = Math.floor(Math.random() * location.length);
       pokeLocation.textContent = `${(location[randomLocation].location_area.name).replaceAll("-", " ")}`;
   }else{
       pokeLocation.textContent = "N/A";
   }

   // Abilities
   const abilityArray = pokeData.abilities.map(ability => ability.ability.name);
   pokeAbilities.textContent = `${abilityArray.join(', ')}`;

   // Moves
   const movesArray = pokeData.moves.map(move => move.move.name);
   pokeMoves.textContent = `${movesArray.join(', ')}`;

});

// Shiny Button NEEDS WORK!!!
shinyBtn.addEventListener('click', async () => {
    if(pokeImage.src == pokeData.sprites.other['official-artwork'].front_default){
        sparkleIcon.src = "./assets/SparkleFilled.png";
        pokeImage.src = pokeData.sprites.other['official-artwork'].front_shiny;
        console.log("shiny");
    }else{
        sparkleIcon.src = "./assets/Sparkle.png";
        pokeImage.src = pokeData.sprites.other['official-artwork'].front_default;
        console.log("normal");
    }
});

// Fetch Pokemon Data
const PokemonApi = async (userSearch) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${userSearch}`);
    const data = await promise.json();

    const evoGet = await fetch(`${data.species.url}`)
    const evoData = await evoGet.json();

    const evoChain = await fetch(`${evoData.evolution_chain.url}`);
    const evoChainData = await evoChain.json();

    if(evoChainData.chain.evolves_to.length === 0){
        pokeEvo.textContent = "No Evolutions";
    }else{
        const evoArray = [evoChainData.chain.species.name];

        const seeEvo = chain => {
            if(chain.evolves_to.length === 0){
                return;
            }else{
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





