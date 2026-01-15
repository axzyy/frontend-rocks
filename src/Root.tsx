import { useState, useEffect } from "react";
import { Link } from "react-router";

export function Root(){
  return (
    <div className="flex gap-8">
      <Card pokemonName="Charizard" />
      <Card pokemonName="Pikachu" />
    </div>
  );
};
  
const Card = ({ pokemonName }: { pokemonName: string }) => {
  return (
    <div className="bg-green-500">
      <h1 className="text-2xl text-white">{pokemonName}</h1>
      <div className="flex flex items-center justify-center">
        <img src="https://via.placeholder.com/200" alt={pokemonName} className="w-48 h-48 object-cover" />
      </div>
    </div>
  );
}