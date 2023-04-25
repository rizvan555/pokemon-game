import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PokemonInfoStyled = styled.ul`
  text-align: left;
  list-style: none;
  font-size: 10px;
  width: 40vw;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 35vw;
    border-radius: 0.5%;
    p:nth-of-type(1) {
      color: red;
      width: 8vw;
    }
    p {
      color: #000;
      font-weight: bold;
    }
    .powerBar {
      width: 50vw;
      height: 1vh;
      background-color: rgb(139, 143, 209);
      transform: translateY(1vh);
      animation: fadeIn 5s;
    }
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }
`;

function PokemonInfo() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    async function fetchPokemonData() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
      const data = await response.json();
      setPokemonData(data);
    }
    fetchPokemonData();
  }, []);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const stats = pokemonData.stats.map((stat) => {
    return {
      name: stat.stat.name,
      baseStat: stat.base_stat,
    };
  });

  const statBarStyle = {
    width: `${stats.baseStat}%`,
    height: "10px",
    backgroundColor: "#fbff26",
    transition: "width 2s ease-in-out",
  };

  return (
    <div>
      <PokemonInfoStyled>
        {stats.map((stat) => (
          <li key={stat.name}>
            <p>{stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}</p>
            <article className="powerBar">
              <div
                style={{ ...statBarStyle, width: `${stat.baseStat}%` }}
              ></div>
            </article>
            {stat.baseStat}%
          </li>
        ))}
      </PokemonInfoStyled>
    </div>
  );
}

export default PokemonInfo;
