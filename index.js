const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const TYPE_API_URL = "https://pokeapi.co/api/v2/type/";

const searchText = document.getElementById("search-text");
const searchButton = document.querySelector(".search-button");
const clearButton = document.querySelector(".clear-button");
const sortSelect = document.getElementById("sort");
const typeList = document.getElementById("type-list");
const cardList = document.querySelector(".card-list");

async function fetchPokemonTypes() {
    try {
        const response = await fetch(TYPE_API_URL);

        if (!response.ok) {
            console.error("Error fetching Pokémon types:", response.statusText);
        } else {
            const data = await response.json();

            typeList.innerHTML = ""; // Clear existing types

            const types = data.results;

            types.forEach(type => {
                const listItem = document.createElement("li");
                listItem.className = `type-item type-${type.name}`;
                listItem.textContent = `${type.name}`;
                typeList.appendChild(listItem);
            });
        }

    } catch (error) {
        console.error("Error fetching Pokémon types:", error);
    }
}

async function fetchPokemonCards(limit = 204) {
    try {
        const response = await fetch(API_URL + `?limit=${limit}`);

        if (!response.ok) {
            console.error("Error fetching Pokémon data:", response.statusText);
        } else {
            const data = await response.json();

            cardList.innerHTML = ""; // Clear existing cards

            const pokemonList = data.results;

            for (const pokemon of pokemonList) {
                const pokemonResponse = await fetch(pokemon.url);
                if (pokemonResponse.ok) {
                    const pokemonData = await pokemonResponse.json();
                    
                    const card = createPokemonCard(pokemonData);
                    cardList.innerHTML += card;
                }
            }
        }

    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
    }
}

function createPokemonCard(pokemon) {
    const card = `<a href="single-pokemon.html?name=${pokemon.name}" class="card-link" onclick="loadSinglePokemonPage('${pokemon.name}')">
                    <div class="card">
                        <div class="card-header">
                            <span class="id">${pokemon.id.toString().padStart(3, '0')}</span>
                            <img src="${pokemon.sprites.front_default}" alt="Pokemon" class="pokemon-img">
                        </div>

                        <div class="card-body">
                            <h2 class="name">${pokemon.name.toString()[0].toUpperCase() + pokemon.name.slice(1)}</h2>
                            ${pokemon.types.map(type => type.type.name).map(type => `<span class="type type-${type}">${type}</span>`).join(' ')}
                            <p class="species">${pokemon.species.name}</p>
                        </div>
                    </div>
                </a>`;
    return card;
}

function handleSearch() {
    const searchText = document.getElementById("search-text").value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const name = card.querySelector(".name").textContent.toLowerCase();
        if (name.includes(searchText)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// sort functionality
sortSelect.addEventListener("change", () => {
    switch (true) {
        case sortSelect.value === "0":
            // Name ASC
            Array.from(cardList.children)
                .sort((a, b) => {
                    const nameA = a.querySelector(".name").textContent.toLowerCase();
                    const nameB = b.querySelector(".name").textContent.toLowerCase();
                    return nameA.localeCompare(nameB);
                })
                .forEach(card => cardList.appendChild(card));
            break;
        case sortSelect.value === "1":
            // Name DESC
            Array.from(cardList.children)
                .sort((a, b) => {
                    const nameA = a.querySelector(".name").textContent.toLowerCase();
                    const nameB = b.querySelector(".name").textContent.toLowerCase();
                    return nameB.localeCompare(nameA);
                })
                .forEach(card => cardList.appendChild(card));
            break;
        case sortSelect.value === "2":
            // ID ASC
            Array.from(cardList.children)   
                .sort((a, b) => {
                    const idA = parseInt(a.querySelector(".id").textContent);
                    const idB = parseInt(b.querySelector(".id").textContent);
                    return idA - idB;
                })
                .forEach(card => cardList.appendChild(card));
            break;
        case sortSelect.value === "3":
            // ID DESC
            Array.from(cardList.children)
                .sort((a, b) => {
                    const idA = parseInt(a.querySelector(".id").textContent);
                    const idB = parseInt(b.querySelector(".id").textContent);
                    return idB - idA;
                })
                .forEach(card => cardList.appendChild(card));
            break;
    }
});

function handleTypeFilter() {
    let selectedType = addEventListener("click" , () => {
        selectedType = event.target.textContent.toLowerCase();
    });
    const cards = document.querySelectorAll(".card");

    addEventListener("click", () => {
        cards.forEach(card => {
            const types = Array.from(card.querySelectorAll(".type")).map(typeElem => typeElem.textContent.toLowerCase());
            if (types.includes(selectedType)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// filter by type on click
typeList.addEventListener("click", handleTypeFilter);

// search on input
searchText.addEventListener("input", handleSearch);

// search on button click
searchButton.addEventListener("click", handleSearch);

// clear search
clearButton.addEventListener("click", () => {
    searchText.value = "";
    handleSearch();
    window.location.reload();
});

const loadMoreButton = document.querySelector(".load-more-button");

loadMoreButton.addEventListener("click", () => {
    const limit  = cardList.children.length + 20;
    fetchPokemonCards(limit);
});

function loadSinglePokemonPage(name) {
    const locationURL = window.location.href = `single-pokemon.html?name=${name}`;
    console.log(locationURL);
}