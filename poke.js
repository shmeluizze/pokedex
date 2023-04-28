console.log('You have connected...')

document.addEventListener("DOMContentLoaded", () => {
    let generateBtn = document.querySelector('#generate-btn');
    generateBtn.addEventListener('click', renderEverything);

    let deleteBtn = getDeleteBtn();
    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteEverything);
    }
});

function renderEverything() {
    let allPokemonContainer = document.querySelector('#poke-container');
    allPokemonContainer.innerText = "";
    fetchKantoPokemon();

    let deleteBtn = getDeleteBtn();
    if (deleteBtn) {
        deleteBtn.style.display = 'block';
    }
}

function getDeleteBtn() {
    return document.querySelector('#delete-btn');
}

function fetchKantoPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(function(allpokemon) {
            allpokemon.results.sort((a, b) => a.name.localeCompare(b.name));
            allpokemon.results.forEach(function(pokemon) {
                fetchPokemonData(pokemon);
            })
        })
}

function fetchPokemonData(pokemon) {
    let url = pokemon.url
    fetch(url)
        .then(response => response.json())
        .then(function(pokeData) {
            renderPokemon(pokeData);
        });
}

function renderPokemon(pokemon) {
    let allPokemonContainer = document.querySelector('#poke-container');
    let pokeCard = document.createElement("div");
    pokeCard.className = "ui card";

    let pokeHeader = document.createElement("div");
    pokeHeader.className = "header";
    pokeHeader.innerText = pokemon.name;

    let pokeImage = document.createElement("img");
    pokeImage.className = "pokemon-image";
    pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

    let pokeTypes = document.createElement("div");
    pokeTypes.className = "meta";
    let types = pokemon.types.map(type => type.type.name);
    pokeTypes.innerText = `Type: ${types.join(", ")}`;

    pokeCard.append(pokeImage);
    pokeCard.append(pokeHeader);
    pokeCard.append(pokeTypes);

    allPokemonContainer.append(pokeCard);
}

function deleteEverything() {
    let allPokemonContainer = document.querySelector('#poke-container');
    allPokemonContainer.innerText = "";
    getDeleteBtn().style.display = 'none';
}
