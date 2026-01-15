import { useState, useEffect } from "react";
import { PokeAPI } from "./api";

type Pokemon = {
  id: number;
  name: string;
  image: string;
};

const Card = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="bg-black p-2 border border-white ">
      <h1 className="text-sm text-white capitalize">
        #{pokemon.id} {pokemon.name}
      </h1>

      <div className="flex items-center justify-center">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-24 h-24"
        />
      </div>
    </div>
  );
};

export function Root() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const pokemons: Pokemon[] = [];
      for (let i = 1; i <= 20; i++) {
        const pokemon = await PokeAPI.getPokemonById(i);
        pokemons.push({
          id: pokemon.id,
          name: pokemon.name,
          image: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`,
        });
      }
      setPokemons(pokemons);
    };
    fetchPokemons();
  }, []);

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemons.map((p) => (
        <Card key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
