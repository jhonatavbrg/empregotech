const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

const createPokemonLi = (pokemon) => {
    const firstLetterUpperCase = pokemon.name.charAt(0).toUpperCase();
    const remainingLetters = pokemon.name.slice(1);
    const capitalize = firstLetterUpperCase + remainingLetters;

    return `
            <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${capitalize}</span>

                <div class="detail">
                    <ol class="types">
                        <li>grass</li>
                        <li>poison</li>
                    </ol>
                    <img src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg" alt="${capitalize}" />
                </div>

            </li>
        `;
};

const fetchApi = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return data.results;
};

fetchApi(url)
    .then(pokemons => {
        const orderedList = document.querySelector('.pokemons');
        console.log(orderedList);

        pokemons.forEach(el => {
            orderedList.innerHTML += createPokemonLi(el);
        });
    });



