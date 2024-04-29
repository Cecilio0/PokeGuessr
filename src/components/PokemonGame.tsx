"use client";

import Pokemon from "@/utils/interfaces/pokemon.interface";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [isClear, setIsClear] = useState(false);
  const [pokemonSelected, setPokemonSelected] = useState(0);

  const onButtonClick = (pokemonId: number) => {
    setIsClear(true);
    setPokemonSelected(pokemonId);
  };

  const onTryAgainClick = () => {
    router.refresh();
    setIsClear(false);
    setPokemonSelected(0);
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
                <p
                  className={
                    pokemonSelected == 0
                      ? "hover:font-bold"
                      : "hover:font-normal"
                  }
                >
                  {pokemon.name}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center">
        {pokemonSelected == 0 ? (
          <p></p>
        ) : pokemonSelected == correctPokemonId ? (
          <p className="text-emerald-800 p-1">You are correct!</p>
        ) : (
          <p className="text-red-800 p-1">Are you stupid or something?</p>
        )}

        {pokemonSelected != 0 ? (
          <button
            className={`bg-white rounded-lg p-1`}
            onClick={onTryAgainClick}
          >
            <p className="hover:font-bold">Try Again</p>
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
