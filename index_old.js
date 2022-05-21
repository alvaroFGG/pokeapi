const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=15';


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

