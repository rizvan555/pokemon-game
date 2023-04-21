import { useEffect, useState } from "react";
import styled from "styled-components";
import { ImBackward } from "react-icons/im";

const Search = () => {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((json) => setPokemons(json.results));
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      fetch(selectedPokemon.url)
        .then((response) => response.json())
        .then((json) => {
          setSelectedPokemonDetails(json);
          fetch(`https://pokeapi.co/api/v2/pokemon-species/${json.id}`)
            .then((response) => response.json())
            .then((json) => {
              setDescription(json.flavor_text_entries[0].flavor_text);
            });
        });
    }
  }, [selectedPokemon]);

  const searchFunction = (e) => {
    const foundPokemon = pokemons.find(
      (pokemon) => pokemon.name.toLowerCase() === search.toLowerCase()
    );
    if (foundPokemon) {
      setSelectedPokemon(foundPokemon);
    } else {
      setSelectedPokemon(null);
      setSelectedPokemonDetails(null);
      console.log("Pokemon not found");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchFunction();
    }
  };

  const handleGoBack = () => {
    window.location.reload();
  };

  return (
    <>
      <section className="search-container">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyDown}
        />
        <button onClick={searchFunction}>Search</button>
      </section>

      <main>
        {selectedPokemonDetails ? (
          <div className="result-container" style={{ height: "100vh" }}>
            <ImBackward onClick={handleGoBack} />
            <h1>
              {selectedPokemon.name.charAt(0).toUpperCase() +
                selectedPokemon.name.slice(1)}
            </h1>
            <h3 style={{ display: "flex", gap: "10px" }}>
              {selectedPokemonDetails.types.map((pokemonType) => (
                <span key={pokemonType.type.name}>{pokemonType.type.name}</span>
              ))}
            </h3>
            <img
              src={selectedPokemonDetails.sprites.front_default}
              alt={selectedPokemon.name}
            />

            <p>Weight: {selectedPokemonDetails.weight / 10} kg</p>
            <p>Height: {selectedPokemonDetails.height * 10} cm</p>
            <p>
              Moves:{" "}
              {selectedPokemonDetails.abilities
                .map((abilityMovie) => abilityMovie.ability.name)
                .join(", ")}
            </p>
            <p>{description}</p>
          </div>
        ) : (
          pokemons &&
          pokemons.map((pokemon, imageIndex) => {
            const pokemonImageNumber = imageIndex + 1;
            const pokemonIdNumber = imageIndex + 1;
            const myImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonImageNumber}.png`;
            const myIdNumber = `${pokemonIdNumber}`.padStart(3, 0);
            return (
              <div className="pokemon-container" key={pokemon.name}>
                <div className="pokemon-box">
                  <p className="pokemonId">#{myIdNumber}</p>
                  <img src={myImageUrl} alt={pokemon.name} />
                  <h1>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </h1>
                </div>
              </div>
            );
          })
        )}
      </main>
    </>
  );
};

export default Search;
