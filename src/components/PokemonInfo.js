import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PokemonInfoStyled = styled.ul`
  text-align: left;
  list-style: none;
  font-size: 10px;
  width: 35vw;
  line-height: 10px;
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    p {
      color: #000;
      font-weight: bold;
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

  return (
    <div>
      <PokemonInfoStyled>
        {stats.map((stat) => (
          <li key={stat.name}>
            <p>{stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}</p>
            {stat.baseStat}
          </li>
        ))}
      </PokemonInfoStyled>
    </div>
  );
}

export default PokemonInfo;
