const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

function createPokemonDetail(pokeDetail) {
  const pokemonDetail = new PokemonDetail();

  pokemonDetail.number = pokeDetail.id;
  pokemonDetail.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemonDetail.types = types;
  pokemonDetail.type = type;

  pokemonDetail.photo = pokeDetail.sprites.other.dream_world.front_default;
  pokemonDetail.species = pokeDetail.species.name;
  pokemonDetail.height = pokeDetail.height;
  pokemonDetail.width = pokeDetail.weight;

  pokemonDetail.abilities = pokeDetail.abilities
    .map((ab) => ab.ability.name)
    .join(", ");

  return pokemonDetail;
}

pokeApi.getPokemonByName = (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

  return fetch(url)
    .then((response) => response.json())
    .then((pokemon) => createPokemonDetail(pokemon));
};
