import axios from "axios";
import Pokemon from "../interfaces/pokemon.interface";
import { error } from "console";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function getPokemonById(id: number): Promise<Pokemon | void> {
  let response: Pokemon = await axios
    .get(`${POKEMON_API_URL}${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}

const POKEMON_IMAGE_API_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

export async function getPokemonImageById(id: number) {
  let response = await axios
    .get(`${POKEMON_IMAGE_API_URL}${id}.svg`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}
