import { getPokemonById } from "@/utils/helpers/pokemon.helper";

interface PokemonIdsContainer {
  pokemonIds: Array<number>;
}

export default async function PokemonNameTable({
  pokemonIds,
}: PokemonIdsContainer) {
  async function getPokemonNames(
    pokemonIds: Array<number>
  ): Promise<Array<string>> {
    let pokemonNames: Array<string> = [];
    for (let index = 0; index < pokemonIds.length; index++) {
      let result = await getPokemonById(pokemonIds[index]);
      result ? pokemonNames.push(result.name) : pokemonNames.push("Error");
    }
    return pokemonNames;
  }

  const pokemonNames: Array<string> = await getPokemonNames(pokemonIds);

  return (
    <div className="bg-purple-500 rounded-lg px-4 py-1 items-center text-black">
      <ul>
        {pokemonNames.map((name: string) => (
          <li key={name} className="flex flex-col items-center m-2">
            <button className="min-w-40 bg-purple-100 rounded-lg">
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
