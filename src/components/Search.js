import { useEffect, useState } from "react";
import styled from "styled-components";

const MainSection = styled.section`
  display: flex;
  justify-content: center;
  width: 90vw;
  gap: 10px;
  padding: 20px;
  flex-wrap: wrap;
`;

const PokemonsContainerStyled = styled.div`
  .pokemon-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20vw;
    border: 1px solid #e5e5e5;
    padding: 0 20px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: #fff;
    color: #000;
  }
  .pokemonId {
    text-align: end;
    margin-left: auto;
  }
  img {
    width: 20vw;
  }
`;
const ResultContainerStyled = styled.div``;

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
    e.preventDefault();
    const foundPokemon = pokemons.find(
      (pokemon) =>
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) === search
    );
    if (foundPokemon) {
      setSelectedPokemon(foundPokemon);
    } else {
      setSelectedPokemon(null);
      setSelectedPokemonDetails(null);
      console.log("Pokemon not found");
    }
  };

  return (
    <>
      <section className="search-container">
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchFunction}>Search</button>
      </section>

      <MainSection>
        {selectedPokemonDetails ? (
          <ResultContainerStyled>
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
          </ResultContainerStyled>
        ) : (
          pokemons &&
          pokemons.map((pokemon, imageIndex) => {
            const pokemonImageNumber = imageIndex + 1;
            const pokemonIdNumber = imageIndex + 1;
            const myImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonImageNumber}.png`;
            const myIdNumber = `${pokemonIdNumber}`.padStart(3, 0);
            return (
              <PokemonsContainerStyled key={pokemon.name}>
                <div className="pokemon-box">
                  <p className="pokemonId">#{myIdNumber}</p>
                  <img src={myImageUrl} alt={pokemon.name} />
                  <h1>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </h1>
                </div>
              </PokemonsContainerStyled>
            );
          })
        )}
      </MainSection>
    </>
  );
};

export default Search;
