import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PokemonInfoStyled = styled.div`
  width: 60vw;
  text-align: left;
  list-style: none;
  font-size: 10px;
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
            {stat.name}: {stat.baseStat}
          </li>
        ))}
      </PokemonInfoStyled>
    </div>
  );
}

export default PokemonInfo;
