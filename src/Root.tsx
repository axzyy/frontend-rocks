import { useState, useEffect } from "react";
import { PokeAPI } from "./api";

type Pokemon = {
  id: number;
  name: string;
  image: string;
  type: string;
};

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  ice: "bg-cyan-400",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-700",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-gray-600",
  ghost: "bg-purple-700",
  dragon: "bg-blue-700",
  dark: "bg-gray-800",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
};

const getColorByType = (type: string): string => {
  return typeColors[type] || "bg-black";
};

const Card = ({ pokemon }: { pokemon: Pokemon }) => {
  const bgColor = getColorByType(pokemon.type);
  return (
    <div className={`${bgColor} p-2 border border-white`}>
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
          image: pokemon.sprites.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/pokemon/${i}.png`,
          type: pokemon.types[0].type.name,
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
