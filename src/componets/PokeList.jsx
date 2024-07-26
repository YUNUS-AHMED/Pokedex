import React from 'react';
import PokeCards from './PokeCards';


function PokeList({ filteredPokemon }) {
  return filteredPokemon.length === 0 ? (
    <div className="no-results-message">No Pokémon found.</div>
  ) : (
    <div className="pokemon-container">
      {filteredPokemon.map((pokemon) => (
        <PokeCards pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
}

export default PokeList;