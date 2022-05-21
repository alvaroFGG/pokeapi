const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=45';


const pokedexSection$$ = document.querySelector("section[class = 'pokedex'");


const elemsToDOM = (pokemon) =>{
    const cardDiv$$ = document.createElement("div");
    cardDiv$$.classList.add("pokedex__card");

    const img = document.createElement("img");
    img.setAttribute("src",pokemon.sprites.front_default);

    const pokemonName$$ = document.createElement("h4");
    pokemonName$$.textContent = pokemon.name;

    cardDiv$$.appendChild(img);
    cardDiv$$.appendChild(pokemonName$$);
    pokedexSection$$.appendChild(cardDiv$$);
}


const fetchEachElem = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(pokemon => {
        elemsToDOM(pokemon);
    })
    .catch(error => {
        console.log(`La API no responde: ${error}`);
    });
}


const fetchAPI = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(allPokemons => {
        allPokemons.results.forEach(element => {
            //a la funcion le pasamos la url de cada pokemon
            
            fetchEachElem(element.url);
        });
    }).catch(error => {
        console.log(`La API no responde: ${error}`);
    });
} 

fetchAPI(API_URL);

