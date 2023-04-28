console.log('You have connected...')

document.addEventListener("DOMContentLoaded", () => { //sets an even listener that awaits for the HTML Document to be fully loaded beore executing the code inside the curly braces.

    let generateBtn = document.querySelector('#generate-pokemon'); //This uses querySelector to select the HTML Elements with the ID "generate-pokemon" and assign it to 'generateBtn' variable.
    generateBtn.addEventListener('click', renderEverything) //sets up an event listener to trigger 'renderEverything()' function when clicked. 

    getDeleteBtn().addEventListener('click', deleteEverything); //sets an event listener that listens for a click with the ID "delete-btn" and triggers the 'deleteEverything' function when clicked.  

})

function renderEverything() { //this function is called when the 'generateBtn' element is clicked. It first slects the HTML Element with the ID "poke-container" and empties its contents using the 'innerText' property.
    let allPokemonContainer = document.querySelector('#poke-container');
    allPokemonContainer.innerText = ""; // It then calls the 'fetch antoPokemon()' function to fetch information about the first 151 Pokemon and passes the resulting data to 'renderPokemon' to create a card for each.
    fetchKantoPokemon();

    getDeleteBtn().style.display = 'block'; //diplays delete button by changing style.display property to block. 


}



function getDeleteBtn() {
    return document.querySelector('#delete-btn') //uses document 'querySlector()' method to select the element with the ID "delete-btn" and returns it. 
}


function fetchKantoPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151') //This function receives a single 'pokemon' object containing the URL for that Pokemon's data on the PokeAPI. It sends a GET request to that URL to retrieve the data, which is then converted to JSON format.
        .then(response => response.json()) //resulting data is then passed to the 'renderPokemon()' function to cr4eate a card for that Pokemon. 
        .then(function(allpokemon) {

            allpokemon.results.sort((a, b) => a.name.localeCompare(b.name)); // sort the array by name
            allpokemon.results.forEach(function(pokemon) {
                fetchPokemonData(pokemon);
            })
        })
}



function fetchPokemonData(pokemon) { // this function receives a single 'pokemon' object containing the URL for that Pokemoom's data on the PokeAPI. It sends a GET request to that URL to retrieve the data, which is then converted to JSON format. The resulting data is then passed to the 'renderPokemon()' function to create a card for that Pokemon.
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
        //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
        .then(response => response.json())
        .then(function(pokeData) {
            renderPokemon(pokeData)
        })
}


function renderPokemon(pokeData) {
    let allPokemonContainer = document.getElementById('poke-container'); //single 'pokeData' object containing information about a single Pokemon. It creates a new 'div' element to hold data and gives it the class "ui card", 
    let pokeContainer = document.createElement("div") //div will be used to hold the data/details for indiviual pokemon.{}
    pokeContainer.classList.add('ui', 'card');

    createPokeImage(pokeData.id, pokeContainer); //creates an 'img' element containing the pokemon's image and creates 'h4', 'p', and 'ul' elemmts containg the pokemon's name, number and types. 

    let pokeName = document.createElement('h4')
    pokeName.innerText = pokeData.name

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${pokeData.id}`

    let pokeTypes = document.createElement('ul') //ul list will hold the pokemon types


    createTypes(pokeData.types, pokeTypes) // helper function to go through the types array and create li tags for each one

    pokeContainer.append(pokeName, pokeNumber, pokeTypes); //appending all details to the pokeContainer div
    allPokemonContainer.appendChild(pokeContainer); //appending that pokeContainer div to the main div which will                                                             hold all the pokemon cards
}

function createTypes(types, ul) {
    types.forEach(function(type) {
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}

function createPokeImage(pokeID, containerDiv) {
    let pokeImgContainer = document.createElement('div')
    pokeImgContainer.classList.add('image')

    let pokeImage = document.createElement('img')
    pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeID}.png`

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}


function deleteEverything(event) {
    event.target.style = 'none';
    let allPokemonContainer = document.querySelector('#poke-container')
    allPokemonContainer.innerText = ""

    let generateBtn = document.createElement('button')
    generateBtn.innerText = "Generate Pokemon"
    generateBtn.id = 'generate-pokemon'
    generateBtn.classList.add('ui', 'secondary', 'button')
    generateBtn.addEventListener('click', renderEverything);

    allPokemonContainer.append(generateBtn)

}
