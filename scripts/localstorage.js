
// Save to local storage.
const SaveToLocal = (pokeData) => {

    let favorites = GetLocal();

    if(!favorites.includes(pokeData)){
        favorites.push(pokeData);
    }

    localStorage.setItem("favorited", JSON.stringify(favorites));
};

// Get from local storage. If there is no data in it, return empty array.
const GetLocal = () => {
    let localStorageData = localStorage.getItem("favorited");

    if(localStorageData === null){
        return [];
    }
    return JSON.parse(localStorageData);
};


// Remove from local storage.
const RemoveFromLocal = (pokeData) => {
    let favorites = GetLocal();
    let pokeIndex = favorites.indexOf(pokeData);
    favorites.splice(pokeIndex, 1);
    localStorage.setItem("favorited", JSON.stringify(favorites));

};

export { SaveToLocal, GetLocal, RemoveFromLocal };