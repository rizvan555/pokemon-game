import styled from "styled-components";
import PokemonInfo from "./PokemonInfo";

const ResultContainerStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 10px;
  padding: 10px 20px;
  margin: -10px auto 30px auto;
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
    width: 40vw;
    gap: 20px;
    font-weight: bold;
    font-size: 13px;
    span {
      font-size: 10px;
      font-weight: 400;
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
    width: 30vw;
    font-size: 12px;
  }
`;

const ResultContainer = (props) => {
  return (
    <ResultContainerStyled
      style={{
        backgroundColor: props.light ? "white" : "blue",
        color: props.light ? "red" : "white",
      }}
    >
      <div className="header-container">
        <h1>
          {props.selectedPokemon.name.charAt(0).toUpperCase() +
            props.selectedPokemon.name.slice(1)}
        </h1>
        {/* <p>#{selectedPokemon.id.padStart(3, 0)}</p> */}
      </div>
      <img
        className="resultImage"
        src={props.selectedPokemonDetails.sprites.front_default}
        alt={props.selectedPokemon.name}
      />
      <h3 className="resultType">
        {props.selectedPokemonDetails.types.map((pokemonType) => (
          <span key={pokemonType.type.name}>{pokemonType.type.name}</span>
        ))}
      </h3>
      <div className="info-container">
        <p className="weight-box">
          Weight <span>{props.selectedPokemonDetails.weight / 10} kg</span>
        </p>
        <p className="height-box">
          Height <span>{props.selectedPokemonDetails.height * 10} cm</span>
        </p>
        <p className="moves-box">
          Moves
          <span>
            {props.selectedPokemonDetails.abilities
              .map((abilityMovie) => abilityMovie.ability.name)
              .join(", ")}
          </span>
        </p>
      </div>
      <p className="description">{props.description}</p>
      <PokemonInfo />
    </ResultContainerStyled>
  );
};

export default ResultContainer;
