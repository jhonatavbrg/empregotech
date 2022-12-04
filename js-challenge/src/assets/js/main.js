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

const handlePokemonLi = async (offset = 0, limit = 10) => {
    const pokemons = await fetchApi(offset, limit) || [];

    orderedList[0].innerHTML += pokemons.map(createPokemonCard).join('');
};

handlePokemonLi();

const loadMoreBtn = document.querySelector('#loadMoreBtn');

const loadMorePokemons = (event) => {
    let limit = 0;
    let elements = event.currentTarget;
    elements.clicks = (elements.clicks || 1) + 1;
    const { clicks } = elements;
    
    orderedList.childElementCount === 150 ? limit = 1 : limit = 5;

    if(limit === 1) {
        loadMoreBtn.setAttribute('disabled', '');
        loadMoreBtn.removeEventListener('click', loadMorePokemons);
    } 

    handlePokemonLi((5 * clicks), limit);
};

loadMoreBtn.addEventListener('click', loadMorePokemons);

