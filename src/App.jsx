import { useEffect, useState } from "react";

import './App.css'; // Make sure to create this CSS file for styling
import PokeList from "./componets/PokeList";
import Footer from "./componets/Footer";


function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isValidSearch, setIsValidSearch] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150'); // Limit for faster loading
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Fetch detailed info for each Pokémon
        const detailedPokemonList = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            return await pokemonResponse.json();
          })
        );

        setPokemonList(detailedPokemonList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    setIsValidSearch(/^[a-z]*$/.test(value)); // Update validation state
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <>
    <div className="container">
      <h1>Pokedex</h1>
      <div className="search-input">
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </div>
      {!isValidSearch ? (
        <div className="invalid-search-message">Please enter only alphabets.</div>
      ) : (
        <PokeList filteredPokemon={filteredPokemon} />
      )}
    </div>
      <Footer/>
    </>
  );
}

export default App;
