const pokedexSection$$ = document.querySelector("section[class = 'pokedex'");
const search$$ = document.querySelector("input[class='headerPoke__input']");
let OFFSET = 0;
let BOOL = true;

const elemsToDOM = (pokemon) =>{
    
    const cardDiv$$ = document.createElement("div");
    cardDiv$$.classList.add("pokedex__card");
    cardDiv$$.style.order = pokemon.order;

    const img = document.createElement("img");
    img.setAttribute("src",pokemon.sprites.front_default);

    const pokemonName$$ = document.createElement("h4");
    pokemonName$$.textContent = pokemon.name;

    cardDiv$$.appendChild(img);
    cardDiv$$.appendChild(pokemonName$$);
    pokedexSection$$.appendChild(cardDiv$$);

}

const seeker = (allPokemons) =>{
    const filteredPokemons = [];
   
    if(search$$.value != ''){
        
    
        for(const pokemon of allPokemons){
            
            if(pokemon.name.toLowerCase().startsWith(search$$.value.toLowerCase().trim())){
                filteredPokemons.push(pokemon);
            }
        }
        pokedexSection$$.innerHTML = ``;
        for(const pokemon of filteredPokemons){
            elemsToDOM(pokemon); 
        }
    }else{
        pokedexSection$$.innerHTML = ``;
        OFFSET = 0;
        fetchAPI();
    }
}

search$$.addEventListener("input", async () =>{
    const allPokemonsArr = [];
    const apiData = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const allApiData = await apiData.json();
    
    for(each of allApiData.results){
        const fetchPokemon = await fetch(each.url);
        const pokemon = await fetchPokemon.json();
        
        allPokemonsArr.push(pokemon);

    }
    seeker(allPokemonsArr);
});

const fetchEachElem = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(pokemon => {
        // search$$.addEventListener("input", () => seeker(pokemon));
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


const beforeBtn$$ = document.querySelector("button[class='nextBtn__button-before']");
beforeBtn$$.addEventListener("click", () => {
    pokedexSection$$.innerHTML = ``;
    
    if(OFFSET<=0){
        alert("No hay pokemons más atrás")
        OFFSET = 0;
    }else{
        OFFSET-=15
    }
    
    fetchAPI();
});

const nextBtn$$ = document.querySelector("button[class='nextBtn__button-next']");
nextBtn$$.addEventListener("click", () => {
    pokedexSection$$.innerHTML = ``;
    
    if(OFFSET>=135){
        alert("No hay pokemons más atrás")
        OFFSET = 0;
    }else{
        OFFSET+=15
    }
    
    fetchAPI();
});

fetchAPI();

