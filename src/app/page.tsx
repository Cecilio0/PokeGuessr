import PokemonGame from "@/components/PokemonGame";
import { getPokemonById } from "@/utils/helpers/pokemon.helper";
import Pokemon from "@/utils/interfaces/pokemon.interface";
import {
  getNDistinctRandomNumbers,
  getRandomIntegerInRange,
} from "@/utils/random.util";
import { Suspense } from "react";

export default async function Home() {
  async function getPokemonArrayById(
    pokemonIds: Array<number>
  ): Promise<Array<Pokemon>> {
    let pokemonNames: Array<Pokemon> = [];
    for (let index = 0; index < pokemonIds.length; index++) {
      let result = await getPokemonById(pokemonIds[index]);
      result
        ? pokemonNames.push(result)
        : pokemonNames.push({ name: "Error", id: -1 });
    }
    return pokemonNames;
  }

  const pokemonIds: Array<number> = getNDistinctRandomNumbers(4, 1, 649);
  const correctPokemonId: number = pokemonIds[getRandomIntegerInRange(0, 3)];

  const pokemonArray = await getPokemonArrayById(pokemonIds);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-300">
      <div className="flex flex-col w-fit-content max-w-5xl items-center justify-between font-mono text-sm lg:flex rounded-lg p-4">
        <PokemonGame
          pokemonArray={pokemonArray}
          correctPokemonId={correctPokemonId}
        />
      </div>
    </main>
  );
}
