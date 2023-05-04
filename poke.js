

const toggleBtn = document.querySelector(".lines-container");
let line1 = document.querySelector(".line1")
let line2 = document.querySelector(".line2")
let line3 = document.querySelector(".line3")

function toggleMenu() {
    const navbarToggle = document.getElementById("main-navbar");
    navbarToggle.classList.toggle("menu-active");
    line1.classList.toggle("active");
    line2.classList.toggle("active");
    line3.classList.toggle("active");
}
toggleBtn.addEventListener("click", toggleMenu);


const API_ENDPOINTS = {
    'kanto': 'https://pokeapi.co/api/v2/pokemon?limit=151',
    'johto': 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151',
    'hoenn': 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251'
};

// Fetch the Pokemon data for the specified region
async function fetchPokemon(region) {
    const response = await fetch(API_ENDPOINTS[region], {
        headers: {
            'content-type': 'application/json;charset=UTF-8'
        }
    });
    const data = await response.json();

    const pokemonList = await Promise.all(data.results.map(async(result) => {
        const pokemonResponse = await fetch(result.url);
        const pokemonData = await pokemonResponse.json();
        const pokemon = {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types[0].type.name
        };
        return pokemon;
    }));

    return pokemonList;
}


function renderAll(pokemonList) {

    const cardContainers = document.querySelectorAll('.ui.cards .card');
    cardContainers.forEach(container => container.remove());

    //new card container and add the cards to it
    const pokeContainer = document.getElementById('poke-container');
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    pokemonList.forEach(pokemon => {
        const card = document.createElement('div');
        card.innerHTML = `
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <div class="card-body">
          <h5 class="card-title">${pokemon.name}</h5>
          <p class="card-text">Type: ${pokemon.type}</p>
          <p class="card-text">ID: ${pokemon.id}</p>
        </div>`;
        cardContainer.appendChild(card);
    });
    pokeContainer.appendChild(cardContainer);
    console.log(pokeContainer.offsetTop)
    window.scrollTo({
        top: pokeContainer.offsetTop - 200,
        behavior: "smooth"
    })

}

const kantoButton = document.querySelector('#kanto-button');
kantoButton.addEventListener('click', () => {

    fetchPokemon('kanto').then(pokemonList => {
        console.log(pokemonList);
        renderAll(pokemonList);
    }).catch(error => {
        console.error(error);
    });
});

const johtoButton = document.querySelector('#johto-button');
johtoButton.addEventListener('click', () => {
    fetchPokemon('johto').then(pokemonList => {
        renderAll(pokemonList);
    }).catch(error => {
        console.error(error);
    });
});

const hoennButton = document.querySelector('#hoenn-button');
hoennButton.addEventListener('click', () => {
    fetchPokemon('hoenn').then(pokemonList => {
        renderAll(pokemonList);
    }).catch(error => {
        console.error(error);
    });
});
