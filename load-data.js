const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const name = new URLSearchParams(window.location.search).get('name');

async function loadData(name) {
    try {
        const response = await fetch(API_URL + name);

        if (!response.ok) {
            console.error('Error fetching Pokémon data:', response.statusText);
        } else {
            const data = await response.json();

            document.querySelector('.pokemon-name').textContent = data.name.toString()[0].toUpperCase() + data.name.toString().slice(1);
            document.querySelector('.pokemon-id').textContent = `#${data.id.toString().padStart(3, '0')}`;
            document.querySelector('.pokemon-types').innerHTML = '';
            data.types.forEach(typeInfo => {
                const typeSpan = document.createElement('span');
                typeSpan.className = `pokemon-type type-${typeInfo.type.name}`;
                typeSpan.textContent = typeInfo.type.name;
                document.querySelector('.pokemon-types').appendChild(typeSpan);
            });
            document.querySelector('.pokemon-stats').innerHTML = '';
            data.stats.forEach(statInfo => {
                const statDiv = document.createElement('div');
                statDiv.className = 'stat';
                statDiv.innerHTML = `<span class="stat-name">${statInfo.stat.name}</span>: <span class="stat-value">${statInfo.base_stat}</span>`;
                document.querySelector('.pokemon-stats').appendChild(statDiv);
            });
            document.querySelector('.abilities-list').innerHTML = '';
            data.abilities.forEach(abilityInfo => {
                const abilitySpan = document.createElement('li');
                abilitySpan.className = 'ability';
                abilitySpan.textContent = abilityInfo.ability.name;
                document.querySelector('.abilities-list').appendChild(abilitySpan);
            });
            document.querySelector('.weight-value').textContent = `${data.weight} units`;
            document.querySelector('.height-value').textContent = `${data.height} units`;
            document.querySelector('.experience-value').textContent = data.base_experience;

            document.getElementById('front-image').src = data.sprites.front_default || '';
            document.getElementById('back-image').src = data.sprites.back_default || '';

            document.querySelector('.also-like-list').innerHTML = '';
            loadAlsoLike(data.name);

        }
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}

async function loadAlsoLike(name) {
    try {
        const response = await fetch(`${API_URL}${name}`);
        if (!response.ok) {
            console.error("Error fetching similar Pokémon:", response.statusText);
        } else {
            const data = await response.json();

            const typeResponse = await fetch(`https://pokeapi.co/api/v2/type/${data.types[0].type.name}`);

            if (!typeResponse.ok) {
                console.error("Error fetching Pokémon type data:", typeResponse.statusText);
            } else {
                const typeData = await typeResponse.json();

                const similarPokemon = typeData.pokemon
                    .map(p => p.pokemon)
                    .filter(p => p.name !== name) // Exclude the current Pokémon
                    .slice(0, 6); // Get only 6 similar Pokémon

                for (const pokemon of similarPokemon) {
                    const pokemonResponse = await fetch(pokemon.url);
                    if (!pokemonResponse.ok) {
                        console.error("Error fetching similar Pokémon data:", pokemonResponse.statusText);
                    } else {
                        const pokemonData = await pokemonResponse.json();
                        const card = document.createElement('div');
                        card.className = 'also-like-card';
                        card.innerHTML = `
                            <a href="single-pokemon.html?name=${pokemonData.name}">
                                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}" class="also-like-image">
                                <p class="also-like-name">${pokemonData.name.toString().charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
                            </a>
                        `;
                        document.querySelector('.also-like-list').appendChild(card);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Error fetching similar Pokémon:", error);
    }
}

// back to top button functionality
const backToTopBtn = document.querySelector(".back-to-top");

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});