import { useEffect, useState } from "react";
import styled from "styled-components";
import { ImBackward } from "react-icons/im";
import { CgDarkMode } from "react-icons/cg";
import { Link } from "react-router-dom";

const MainContainer = styled.main`
  margin: 0 auto;
  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: #fff;
  }
`;
const SearchContainer = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 10px;
  gap: 1vw;
  input {
    width: 50vw;
    border-radius: 20px;
    border: none;
    padding: 5px;
    ::placeholder {
      padding: 5px;
    }
  }
  button {
    border-radius: 20px;
    border: none;
    padding: 0 10px;
  }
`;

const ContainStyle = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 80vw;
  flex-wrap: wrap;
  margin: 0 auto;
`;
const PokemonContainer = styled(Link)`
  text-decoration: none;
  .pokemon-box {
    display: flex;
    flex-direction: column;
    width: 25vw;
    height: 37vh;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    margin: 1vw;
    text-align: center;
    line-height: 1px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    h1 {
      font-size: 20px;
      letter-spacing: 1px;
    }
    img {
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }
  }
`;
const ResultContainer = styled.section``;

const Search = () => {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);
  const [description, setDescription] = useState("");
  const [light, setLight] = useState(true);

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
      foundPokemon.id = foundPokemon.url.split("/").slice(-2)[0];
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
    setSelectedPokemon(null);
    setSelectedPokemonDetails(null);
    setDescription("");
    setSearch("");
  };

  return (
    <MainContainer
      style={{
        color: light ? "black" : "#dc0c2d",
        backgroundColor: light ? "#dc0c2d" : "black",
        height: "100%",
      }}
    >
      <div className="title-box">
        <CgDarkMode onClick={() => setLight(!light)}>Light-Dark</CgDarkMode>
        <h1>Pokédex</h1>
      </div>

      <SearchContainer>
        <input
          type="text"
          placeholder="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyDown}
        />
        <button onClick={searchFunction}>Search</button>
      </SearchContainer>

      <ContainStyle>
        {selectedPokemonDetails ? (
          <ResultContainer style={{ height: "100vh" }}>
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
          </ResultContainer>
        ) : (
          pokemons &&
          pokemons.map((pokemon, imageIndex) => {
            const pokemonImageNumber = imageIndex + 1;
            const pokemonIdNumber = imageIndex + 1;
            const myImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonImageNumber}.png`;
            const myIdNumber = `${pokemonIdNumber}`.padStart(3, 0);
            return (
              <PokemonContainer key={pokemon.name} to={pokemon.id}>
                <div
                  className="pokemon-box"
                  key={pokemon.name}
                  onClick={() => setSelectedPokemon(pokemon)}
                  style={{
                    backgroundColor: light ? "white" : "red",
                    color: light ? "#000" : "#fff",
                  }}
                >
                  <p className="pokemonId">#{myIdNumber}</p>
                  <img src={myImageUrl} alt={pokemon.name} />
                  <h1>
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </h1>
                </div>
              </PokemonContainer>
            );
          })
        )}
      </ContainStyle>
    </MainContainer>
  );
};

export default Search;
