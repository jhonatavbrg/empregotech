import { fetchApi } from './pokeApi.js';

const formatPokemonId = (id) => {
    if(isNaN(id)) return `#000`;
    if(id.toString().length === 1) return `#00${ id }`;
    else if(id.toString().length === 2) return `#0${ id }`;

    return `#${ id }`;
};

const createPokemonCard = (pokemon) => {
    const { name, id, types, stats, image, backgroundColor } = pokemon;

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

                ${ stats.map(stat => {
                    const sizeAttribute = Object.values(stat).toString().length;
                    const attribute = Object.values(stat);

                    return `<div class="container-stats">
                                <span class=${ sizeAttribute === 3 ? 'stat-number-s3' : 
                                        sizeAttribute === 2 ? 'stat-number-s2' :
                                        sizeAttribute === 1 ? 'stat-number-s1' : 0 }>
                                    ${ attribute }/255
                                </span>
                                <div class="stats ${ backgroundColor }" style="width:${ Math.round(( attribute / 255) * 100) }%">
                                    <span class="stat-name">${Object.keys(stat)}</span>
                                </div>
                            </div>
                            `;
                }).join('') }

            </li>
            `;
};


const orderedList = document.querySelectorAll('.pokemons');
let countCallHandlePokemon = 0;

const handlePokemonLi = async (offset = 0, limit = 10) => {
    countCallHandlePokemon++;
    const pokemons = await fetchApi(offset, limit) || [];

    orderedList[0].innerHTML += pokemons.map(createPokemonCard).join('');

    const liPokemon = document.querySelectorAll('.pokemon');
    if(countCallHandlePokemon > 1) {
        liPokemon[liPokemon.length - 1].scrollIntoView({behavior: "smooth"});
    }

};

handlePokemonLi();

const loadMoreBtn = document.querySelector('#loadMoreBtn');
let offset = 5;

const loadMorePokemons = () => {
    const limit = 5;
    offset += limit;
    const maxPokemonRender = 151;

    const limitPokemonsRender = offset + limit;
    if(limitPokemonsRender >= maxPokemonRender) {
        const newLimit = limit - (limitPokemonsRender - maxPokemonRender);

        handlePokemonLi(offset, newLimit);
        loadMoreBtn.id = 'btnDisabled';
        loadMoreBtn.setAttribute('disabled', '');
        loadMoreBtn.removeEventListener('click', loadMorePokemons);
    }else {
        handlePokemonLi(offset, limit);
    }

};

loadMoreBtn.addEventListener('click', loadMorePokemons);

