import { fetchApi } from './pokeApi.js';

const formatPokemonOrder = (id) => {
    if(typeof(id) !== 'number') return `#000`;
    if(id.toString().length === 1) return `#00${ id }`;
    else if(id.toString().length === 2) return `#0${ id }`;

    return `#${ id }`;
};

const createPokemonTypeLi = (types) => types.map(typeSlot => `<li>${ typeSlot.type.name }</li>`).join('');

const createPokemonCard = (pokemon) => {
    const { name, id, types } = pokemon; 

    const firstLetterUpperCase = name.charAt(0).toUpperCase();
    const remainingLetters = name.slice(1);
    const capitalize = firstLetterUpperCase + remainingLetters;

    return `
            <li class="pokemon">
                <span class="number">${ formatPokemonOrder(id) }</span>
                <span class="name">${ capitalize }</span>

                <div class="detail">
                    <ol class="types">
                        ${ createPokemonTypeLi(types) }
                    </ol>
                    <img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${ id }.svg" alt="${ capitalize }" />
                </div>

            </li>
        `;
};

fetchApi()
    .then((pokemons = []) => {
        const orderedList = document.querySelector('.pokemons');

        orderedList.innerHTML += pokemons.map(createPokemonCard).join('');
    });

