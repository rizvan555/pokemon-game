import { useEffect, useState } from "react";
import { CgDarkMode } from "react-icons/cg";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PokemonInfo from "./PokemonInfo";
import pokeLogo from "../resource/images/pokeLogo.png";

const MainContainer = styled.main`
  margin: 0 auto;
  .title-box {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: #fff;
    margin: 0 auto;
    .pokeLogo {
      width: 50vw;
      margin-bottom: 30px;
    }
  }
`;
const SearchContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 1vw;
  .left-box {
    display: flex;
    justify-content: center;
    align-items: center;
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
      padding: 5px 10px;
    }
  }
  .numbers {
    display: flex;
    gap: 10px;
    text-decoration: none;
    a {
      color: #fff;
      text-decoration: none;
    }
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
  margin: 0 0 20px 0;
  .pokemon-box {
    display: flex;
    flex-direction: column;
    width: 25vw;
    height: 40vh;
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
const ResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70vw;
  text-align: center;
  color: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  padding: 10px 0;
  margin: -10px 0 30px 0;
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 30px;
    width: 40vw;
  }
  .resultImage {
    width: 250px;
    height: 250px;
    margin-top: -15vh;
  }
  .resultType {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: -8vh;
    span {
      padding: 5px 10px;
      text-align: center;
      border-radius: 30px;
      background-color: #e3e3e3;
    }
  }
  .info-container {
    display: flex;
    justify-content: space-around;
    width: 70vw;
    gap: 20px;
    font-weight: bold;
    font-size: 13px;
    span {
      font-size: 8px;
      font-weight: 300;
      color: #000;
    }
  }
  .weight-box,
  .height-box,
  .moves-box {
    display: flex;
    flex-direction: column;
  }
  .description {
    width: 60vw;
    font-size: 12px;
  }
`;

const Num5 = () => {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState(null);
  const [description, setDescription] = useState("");
  const [light, setLight] = useState(true);
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=180&limit=30")
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
        <img className="pokeLogo" src={pokeLogo} alt="logoPokemon" />
      </div>

      <SearchContainer>
        <div className="left-box">
          <Link to="/num4">
            <MdArrowBack
              style={{ color: "white", marginRight: "20" }}
              size="20"
            />
          </Link>
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyDown}
          />
          <button onClick={searchFunction}>Search</button>
        </div>
        <div className="numbers">
          {numbers.map((num) => {
            return (
              <Link key={num} to={`/num${num}`}>
                {num}
              </Link>
            );
          })}
        </div>
      </SearchContainer>

      <ContainStyle>
        {selectedPokemonDetails ? (
          <ResultContainer
            style={{
              backgroundColor: light ? "white" : "blue",
              color: light ? "red" : "white",
            }}
          >
            <div className="header-container">
              <h1>
                {selectedPokemon.name.charAt(0).toUpperCase() +
                  selectedPokemon.name.slice(1)}
              </h1>
            </div>
            <img
              className="resultImage"
              src={selectedPokemonDetails.sprites.front_default}
              alt={selectedPokemon.name}
            />
            <h3 className="resultType">
              {selectedPokemonDetails.types.map((pokemonType) => (
                <span key={pokemonType.type.name}>{pokemonType.type.name}</span>
              ))}
            </h3>
            <div className="info-container">
              <p className="weight-box">
                Weight <span>{selectedPokemonDetails.weight / 10} kg</span>
              </p>
              <p className="height-box">
                Height <span>{selectedPokemonDetails.height * 10} cm</span>
              </p>
              <p className="moves-box">
                Moves
                <span>
                  {selectedPokemonDetails.abilities
                    .map((abilityMovie) => abilityMovie.ability.name)
                    .join(", ")}
                </span>
              </p>
            </div>
            <p className="description">{description}</p>
            <PokemonInfo />
          </ResultContainer>
        ) : (
          pokemons &&
          pokemons.map((pokemon, imageIndex) => {
            const pokemonImageNumber = imageIndex + 151;
            const pokemonIdNumber = imageIndex + 151;
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

export default Num5;
