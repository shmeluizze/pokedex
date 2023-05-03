

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


// Define constants for the API endpoints
const API_ENDPOINTS = {
  'kanto': 'https://pokeapi.co/api/v2/pokemon?limit=151',
  'johto': 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151',
  'hoenn': 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251'
};
 
async function fetchPokemon(region) {
  try {
    // Fetch the Pokemon data for the specified region
    const response = await fetch(API_ENDPOINTS[region]);
    const data = await response.json();
    

    const cards = data.results.map(async (result) => {
      const pokemonResponse = await fetch(result.url);
      const pokemonData = await pokemonResponse.json();
      

      const id = pokemonData.id;
      const name = pokemonData.name;
      const image = pokemonData.sprites.front_default;
      const type = pokemonData.types[0].type.name;
      
      // Create the HTML for the card
      return `
        <div class="card">
          <img src="${image}" alt="${name}">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Type: ${type}</p>
            <p class="card-text">ID: ${id}</p>
          </div>
        </div>
      `;
    });
    
    
    const cardHTML = await Promise.all(cards);
    
    
    const regionContainer = document.querySelector('.region-container');
    regionContainer.innerHTML = cardHTML.join('');
  } catch (error) {
    console.error(error);
  }
}

// Add event listeners to the region buttons
const kantoButton = document.querySelector('#kanto-button');
kantoButton.addEventListener('click', () => fetchPokemon('kanto'));

const johtoButton = document.querySelector('#johto-button');
johtoButton.addEventListener('click', () => fetchPokemon('johto'));

const hoennButton = document.querySelector('#hoenn-button');
hoennButton.addEventListener('click', () => fetchPokemon('hoenn'));



