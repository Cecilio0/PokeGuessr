"use client";

import Pokemon from "@/utils/interfaces/pokemon.interface";
import { useState } from "react";
import Image from "next/image";

interface PokemonGameProps {
  pokemonArray: Array<Pokemon>;
  correctPokemonId: number;
}

const POKEMON_IMAGE_API_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

export default function PokemonGame({
  pokemonArray,
  correctPokemonId,
}: PokemonGameProps) {
  const [isClear, setIsClear] = useState(false);
  const [pokemonSelected, setPokemonSelected] = useState(0);

  const onButtonClick = (pokemonId: number) => {
    setIsClear(true);
    setPokemonSelected(pokemonId);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <p>Try to guess the pokemon</p>
      </div>
      <Image
        className={`h-64 ${isClear ? "clear" : "black"}`}
        src={`${POKEMON_IMAGE_API_URL}${correctPokemonId}.svg`}
        alt="Some text"
        width={1024}
        height={256}
        priority={true}
      />
      <div className="rounded-lg px-4 py-1 items-center text-black">
        <ul>
          {pokemonArray.map((pokemon: Pokemon) => (
            <li key={pokemon.name} className="flex flex-col items-center m-2">
              <button
                className={`min-w-40 ${
                  pokemonSelected != pokemon.id
                    ? "bg-purple-100"
                    : pokemonSelected == correctPokemonId
                    ? "bg-emerald-600"
                    : "bg-red-600"
                } rounded-lg`}
                onClick={() => onButtonClick(pokemon.id)}
                disabled={isClear ? true : false}
              >
                {pokemon.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center">
        {pokemonSelected == 0 ? (
          <p></p>
        ) : pokemonSelected == correctPokemonId ? (
          <p className="text-emerald-800">You are correct!</p>
        ) : (
          <p className="text-red-800">Are you stupid or something?</p>
        )}
      </div>
    </>
  );
}
