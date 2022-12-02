import { Pokemon } from './pokemonModel.js';

const createPokemonDetail = (pokeDetails) => {
    const pokemon = new Pokemon();

    pokemon.id = pokeDetails.id;
    pokemon.name = pokeDetails.name;
    const types = pokeDetails.types.map(typeSlot => typeSlot.type.name);
    pokemon.types = types;
    pokemon.image = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${ pokeDetails.id }.svg`;
    const [ type ] = types;
    pokemon.backgroundColor = type;

    return pokemon
}

export const fetchApi = async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    try {
        const response = await fetch(url);
        const { results } = await response.json();

        const newResp = results.map(async (el) => {
            return await fetch(el.url)
                            .then(response => response.json())
                            .then(createPokemonDetail)
        });

        return Promise.all(newResp);
    } catch(e) {
        console.error(e);
    };
};

