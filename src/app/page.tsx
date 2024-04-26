import PokemonNameTable from "@/components/PokemonTable";
import {
  getNDistinctRandomNumbers,
  getRandomIntegerInRange,
} from "@/utils/random.util";
import Image from "next/image";
import { Suspense } from "react";

const POKEMON_IMAGE_API_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

export default function Home() {
  const pokemonIds: Array<number> = getNDistinctRandomNumbers(4, 1, 649);
  const correctPokemonId = pokemonIds[getRandomIntegerInRange(0, 3)];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col w-fit-content max-w-5xl items-center justify-between font-mono text-sm lg:flex bg-blue-500 rounded-lg p-4">
        <Suspense>
          <Image
            className="p-4"
            src={`${POKEMON_IMAGE_API_URL}${correctPokemonId}.svg`}
            alt="Some text"
            width={300}
            height={300}
          />
          <PokemonNameTable pokemonIds={pokemonIds} />
        </Suspense>
      </div>
    </main>
  );
}
