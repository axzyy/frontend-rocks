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
    PokeAPI.listPokemons(20).then((response) => {
      const mapped = response.results.map(
        (p: { name: string }, idx: number) => {
          const id = idx + 1;

          return {
            id,
            name: p.name,
            image: `https://img.pokemondb.net/artwork/large/${p.name}.jpg`,
          };
        }
      );

      setPokemons(mapped);
    });
  }, []);

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemons.map((p) => (
        <Card key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
