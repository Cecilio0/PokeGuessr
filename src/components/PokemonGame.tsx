"use client";

import Pokemon from "@/utils/interfaces/pokemon.interface";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

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

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [isClear, setIsClear] = useState(false);
  const [pokemonSelected, setPokemonSelected] = useState(0);

  const onButtonClick = (pokemonId: number) => {
    setIsClear(true);
    setPokemonSelected(pokemonId);
    pokemonId == correctPokemonId ? setWins(wins + 1) : setLosses(losses + 1);
  };

  const onTryAgainClick = () => {
    setIsImageLoaded(false);
    setIsClear(false);
    setPokemonSelected(0);
    router.refresh();
  };

  const onImageLoadingComplete = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      <div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row font-bold">
            <p className="text-emerald-800 p-1">Wins: {wins + "  "}</p>
            <p className="text-red-800 p-1">Losses: {losses}</p>
          </div>
          <p>Try to guess the pokemon</p>
        </div>
        {!isImageLoaded && (
          <div className="flex items-center justify-center h-96">
            <CircularProgress size={96} color="secondary" />
          </div>
        )}
        <Image
          className={
            !isImageLoaded ? "hidden" : `h-64 ${isClear ? "clear" : "black"}`
          }
          src={`${POKEMON_IMAGE_API_URL}${correctPokemonId}.svg`}
          alt="Some text"
          width={400}
          height={400}
          priority={true}
          onLoad={onImageLoadingComplete}
        />
        {isImageLoaded && (
          <div className="rounded-lg px-4 py-1 items-center text-black">
            <ul>
              {pokemonArray.map((pokemon: Pokemon) => (
                <li
                  key={pokemon.name}
                  className="flex flex-col items-center m-2"
                >
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
        )}

        <div className="flex flex-col items-center">
          {pokemonSelected == 0 ? (
            <p></p>
          ) : pokemonSelected == correctPokemonId ? (
            <p className="text-emerald-800 p-1">You are correct!</p>
          ) : (
            <p className="text-red-800 p-1">Are you stupid or something?</p>
          )}
        </div>
      </div>
      <footer className="dark:bg-gray-800 w-full mx-auto p-4 flex items-center justify-center bottom-0">
        <button
          className={`bg-white rounded-lg px-2`}
          onClick={onTryAgainClick}
        >
          <p className="hover:font-bold">Load another pokemon</p>
        </button>
      </footer>
    </>
  );
}
