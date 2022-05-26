const pokedexSection$$ = document.querySelector("section[class = 'pokedex'");
const search$$ = document.querySelector("input[class='headerPoke__input']");
let OFFSET = 0;
let BOOL = true;

const typeColors = {
    fire: "#fa5542",
    grass: "#8cd851",
    electric: "#fde440",
    water: "#55aefe",
    ground: "#e9c857",
    rock: "#cfbd73",
    fairy: "#f8adff",
    poison: "#aa5fa2",
    bug: "#c3d21e",
    dragon: "#8572ff",
    psychic: "#f762b2",
    flying: "#78a4ff",
    fighting: "#ab5448",
    normal: "#bcbdaf",
}

const elemsToDOM = (pokemon) =>{
    
    const cardDiv$$ = document.createElement("div");
    cardDiv$$.classList.add("pokedex__card");
    cardDiv$$.style.order = pokemon.order;
    cardDiv$$.setAttribute("onclick","cardClick(this)");

    const img = document.createElement("img");
    img.setAttribute("src",pokemon.sprites.front_default);

    const pokemonName$$ = document.createElement("h4");
    pokemonName$$.textContent = pokemon.name;
    // pokemonName$$.setAttribute("onclick","cardClick(this)");

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


//Sistema de click a las cartas
const pokemonByName = async (name) =>{
    
    let searchedPokemon = {};
    const apiData = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const allApiData = await apiData.json();
    
    for(each of allApiData.results){
        const fetchPokemon = await fetch(each.url);
        const pokemon = await fetchPokemon.json();
        
        if(name === pokemon.name){
            searchedPokemon = pokemon;
        }

    }
    return searchedPokemon;
}


const returnToPokemon = (pokemon, element, divCard) => {
    element.style.transform = 'rotateY(0deg)';
    element.innerHTML =`<img src='${pokemon.sprites.front_default}'><h4>${pokemon.name}</h4>`;
    // element.innerHTML = `
        
    //         <img src='${pokemon.sprites.front_default}'>
    //         <h4>${pokemon.name}</h4>
        
    // `;
    // element.innerHTML = divCard;
    
}


const cardClick = async (element) => {
    let pokemonName = element.childNodes[1].textContent;
    const divCard = element.innerHTML;
    console.log(pokemonName);
    let pokemon = await pokemonByName(pokemonName);
    
    let background = "";
    for (type in typeColors){
        if(type === pokemon.types[0].type.name){
            background = typeColors[type];
        }else if(pokemon.types[0].type.name === "normal"){
            background = "#bcbdaf";
        }
    }
    console.log(background);

    // // if (CARD_STATE==0){
        element.style.transform = 'rotateY(360deg)';
        element.innerHTML = `
            <div class='pokedex__card--back'>
                <h4 class='pokedex__card-type' style='background-color: ${background}'>${pokemon.types[0].type.name}</h4>
                <h3>Abilities:</h3>
                <div class='pokedex__card-abilities'>
                    <h4>${pokemon.abilities[0].ability.name}</h4>
                    <h4>${pokemon.abilities[1].ability.name}</h4>
                </div>
            </div>
        `;

        setTimeout(async () => {
            returnToPokemon(pokemon,element, divCard);
        },7000);

        
        //CARD_STATE = 1;
    //}
}


fetchAPI();



