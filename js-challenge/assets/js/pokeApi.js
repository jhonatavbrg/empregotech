export const fetchApi = async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    try {
        const response = await fetch(url);
        const { results } = await response.json();

        const newResp = results.map(async (el) => {
            return await fetch(el.url)
                            .then(response => response.json())
        });

        return Promise.all(newResp);
    } catch(e) {
        console.error(e);
    };
};

