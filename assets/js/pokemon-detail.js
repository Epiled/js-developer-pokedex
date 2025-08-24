const pokemonContainer = document.getElementById("pokemon-detail");

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const nome = params.get("nome");

  if (nome) {
    pokeApi.getPokemonByName(nome).then((pokemonDetail) => {
      pokemonMain(pokemonDetail);
    });
  }
});

function pokemonMain(pokemonDetail) {
  const { number, name, photo, species, height, width, abilities } =
    pokemonDetail;

  console.log("Tet", pokemonDetail);

  const newHtml = `
    <section class="pokemon-detail">
      <header class="pokemon__top">
        <div class="pokemon__options">
          <button class="pokemon__btn">
            <img src="assets/svg/arrow-left.svg" class="pokemon__icon" />
          </button>
          <button class="pokemon__btn">
            <img src="assets/svg/heart-outline.svg" class="pokemon__icon" />
          </button>
        </div>
        <div class="pokemon__metas">
          <div class="pokemon__base-info">
            <h1 class="pokemon__title">${name}</h1>
            <div class="pokemon__types">
              <span class="pokemon__type">Grass</span>
              <span class="pokemon__type">Poison</span>
            </div>
          </div>
          <p class="pokemon__number">#${number}</p>
        </div>
      </header>

      <img
        src="${photo}"
        alt="${name}"
        class="pokemon__image"
      />

      <main class="pokemon__main">
        <nav class="pokemon__navigation">
          <button>About</button>
          <button>Base Status</button>
          <button>Evolution</button>
          <button>Movies</button>
        </nav>

        <div class="pokemon__content">
          <table class="pokemon__table">
            <tr class="pokemon__line">
              <th class="pokemon__table-header">Species</th>
              <td>${species}</td>
            </tr>
            <tr class="pokemon__line">
              <th class="pokemon__table-header">Height</th>
              <td>${height}</td>
            </tr>
            <tr class="pokemon__line">
              <th class="pokemon__table-header">Width</th>
              <td>${width}</td>
            </tr>
            <tr class="pokemon__line">
              <th class="pokemon__table-header">Abilities</th>
              <td>${abilities}</td>
            </tr>
          </table>
        </div>
      </main>
    </section>
  `;
  pokemonContainer.innerHTML = newHtml;
}
