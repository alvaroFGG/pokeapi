const pokedexSection$$ = document.querySelector("section[class = 'pokedex'");
let OFFSET = 0;

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


const fetchAPI = () => {
    const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=15&offset='+OFFSET;
    fetch(API_URL)
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


const nextBtn$$ = document.querySelector("button[class='nextBtn__button']");
nextBtn$$.addEventListener("click", () => {
    pokedexSection$$.innerHTML = ``;
    
    if(OFFSET>=135){
        alert("Ya has visto los 150 pokemons originales")
        OFFSET = 0;
    }else{
        OFFSET+=15
    }
    
    fetchAPI();
});

fetchAPI();

