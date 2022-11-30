import { fetchApi } from './pokeApi.js';

const formatPokemonId = (id) => {
    if(isNaN(id)) return `#000`;
    if(id.toString().length === 1) return `#00${ id }`;
    else if(id.toString().length === 2) return `#0${ id }`;

    return `#${ id }`;
};

const createPokemonCard = (pokemon) => {
    const { name, id, types, image, backgroundColor } = pokemon;

    return `
            <li class="pokemon ${ backgroundColor }">
                <span class="number">${ formatPokemonId(id) }</span>
                <span class="name">${ name }</span>

                <div class="detail">
                    <ol class="types">
                        ${ types.map(type => `<li class=${ type }>${ type }</li>`).join('') }
                    </ol>
                    <img src=${ image } alt="${ name }" />
                </div>

            </li>
        `;
};

const handlePokemonLi = async (offset = 0, limit = 10) => {
    const pokemons = await fetchApi(offset, limit) || [];

    const orderedList = document.querySelector('.pokemons');

    orderedList.innerHTML += pokemons.map(createPokemonCard).join('');
};

handlePokemonLi();

