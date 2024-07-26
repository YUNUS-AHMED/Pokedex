import React from 'react';

const PokeCards = ({pokemon}) => {
  return (
            <div className="pokemon-card" >
            <h2>{pokemon.name[0].toUpperCase() +pokemon.name.slice(1)}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <a href={pokemon.url} target="_blank" rel="noopener noreferrer">
              More Details
            </a>
          </div>
    
  );
};

export default PokeCards;
