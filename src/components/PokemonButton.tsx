"use client";
import Pokemon from "@/utils/interfaces/pokemon.interface";

interface PokemonButtonProps {
  pokemon: Pokemon;
}

export default function PokemonButton({ pokemon }: PokemonButtonProps) {
  const onPokemonClick = () => {
    console.log("pain");
  };

  return (
    <button
      className="min-w-40 bg-purple-100 rounded-lg"
      onClick={() => onPokemonClick()}
    >
      {pokemon.name}
    </button>
  );
}
