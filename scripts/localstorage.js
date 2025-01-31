
// Save to local storage.
const SaveToLocal = (pokeSave) => {

    let favorites = GetLocal();

    if(!favorites.includes(pokeSave)){
        favorites.push(pokeSave);
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
const RemoveFromLocal = (pokeSave) => {
    let favorites = GetLocal();
    let pokeIndex = favorites.indexOf(pokeSave);
    favorites.splice(pokeIndex, 1);
    localStorage.setItem("favorited", JSON.stringify(favorites));

};

export { SaveToLocal, GetLocal, RemoveFromLocal };