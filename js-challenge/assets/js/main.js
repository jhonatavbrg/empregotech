import { fetchApi } from './pokeApi.js';

const formatPokemonId = (id) => {
    if(typeof(id) !== 'number') return `#000`;
    if(id.toString().length === 1) return `#00${ id }`;
    else if(id.toString().length === 2) return `#0${ id }`;

    return `#${ id }`;
};

const capitalizePokemonName = (pokeName) => {
    const firstLetterUpperCase = pokeName.charAt(0).toUpperCase();
    const remainingLetters = pokeName.slice(1);
    return firstLetterUpperCase + remainingLetters;
}

const createPokemonCard = (pokemon) => {
    const { name, id, types, image, backgroundColor } = pokemon;

    return `
            <li class="pokemon ${ backgroundColor }">
                <span class="number">${ formatPokemonId(id) }</span>
                <span class="name">${ capitalizePokemonName(name) }</span>

                <div class="detail">
                    <ol class="types">
                        ${ types.map(type => `<li>${ type }</li>`).join('') }
                    </ol>
                    <img src=${ image } alt="${ capitalizePokemonName(name) }" />
                </div>

            </li>
        `;
};

fetchApi()
    .then((pokemons = []) => {
        const orderedList = document.querySelector('.pokemons');

        orderedList.innerHTML += pokemons.map(createPokemonCard).join('');
    });

