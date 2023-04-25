const poke_container = document.getElementById('poke-container')
const pokemon_count = 4;
const page = {url:`https://pokeapi.co/api/v2/pokemon/?limit=18&offset=18`}
const observer = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            fetchPokemons();
        }
    })
},{
    rootMargin:'0px 0px 0px 0px',
    threshold:1.0
});
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    await getPokemon();
}

const getPokemon = async () => {
    const res = await fetch(page.url)
    const data = await res.json()
    page.url = data.next;
    createPokemonCard(data.results)
    getAllPokemonOnScreen();
}

const createPokemonCard = async (pokemons) => {
    pokemons.forEach(pokemon=>{
        const pokemonEl = document.createElement('div')
        pokemonEl.classList.add('pokemon')
        const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
        getPokemonData(pokemon.url).then(res=>{
            const {id,types} = res;
            const pokeId = id.toString().padStart(3, '0')

            const poke_types = types.map(type => type.type.name)
            const type = main_types.find(type => poke_types.indexOf(type) > -1)
            const color = colors[type]
    
            pokemonEl.style.backgroundColor = color
    
            const pokemonInnerHTML = `
            <div class="img-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"" alt="${name}">
            </div>
            <div class="info">
                <span class="number">#${pokeId}</span>
                <h3 class="name">${name}</h3>
                <small class="type">Type: <span>${type}</span> </small>
            </div>
            `
            pokemonEl.innerHTML = pokemonInnerHTML
            poke_container.appendChild(pokemonEl)
        })
    })
}

const getPokemonData = async (url)=>{
    let res = await fetch(url);
    let data = res.json();
    return data;
}

const getAllPokemonOnScreen = ()=>{
    setTimeout(()=>{
        const all = document.querySelectorAll('.poke-container .pokemon');
        const lastPokemon = all[all.length-1];
        observer.observe(lastPokemon);
    },1000)
}

fetchPokemons();