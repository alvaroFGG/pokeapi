const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=30';


const ul = document.querySelector("ul");

const fetchEachElem = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(pokemon => {
        const li = document.createElement("li");
        
        const img = document.createElement("img");
        img.setAttribute("src",pokemon.sprites.front_default);

        li.appendChild(img);
        ul.appendChild(li);
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
    });
} 

fetchAPI(API_URL);

