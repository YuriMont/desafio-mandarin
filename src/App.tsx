import { useEffect, useState } from "react";
import { api } from "./lib/axios";
import search from "./assets/lupa.png"

type Pokemon = {
  id: number;
  name: string;
  category: string;
  image_url: string;
  background_image_url: string;
  date: string;
}[];

function App() {
  const [pokemons, setPokemons] = useState<Pokemon>();

  function fetchPokemonByName(name: string){
    api.get(`?name=${name}`).then((response) => setPokemons(response.data));
  }

  useEffect(() => {
    api.get("").then((response) => setPokemons(response.data));
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen w-screen p-16 sm:p-10">

      <div className="space-y-2 text-center mb-8">
        <h1 className="text-5xl uppercase font-bold">Pokédex</h1>
        <span className="flex items-center relative">
          <img className="w-6 h-6 absolute left-3" src={search} alt="search" />
          <input className="min-w-[50vw] text-zinc-900 placeholder:text-zinc-500 px-3 py-2 rounded-md pl-12 bg-zinc-300 border-zinc-500 border" placeholder="Bulbasaur" type="text" onChange={(event) => (fetchPokemonByName(event.target.value))} />
        </span>
      </div>

      <div className="grid grid-cols-3 grid-flow-row sm:flex sm:flex-col gap-6">
        {pokemons?.map((pokemon) => (
          <div key={pokemon.id}>
            <div
              className="min-h-[200px] rounded-md aspect-video w-auto flex items-center justify-center bg-cover"
              style={{
                backgroundImage: `url(${pokemon.background_image_url})`,
              }}
            >
              <img src={pokemon.image_url} alt="" />
            </div>
            <div className="w-full my-2 flex justify-around items-center">
              <h1 className="text-xl font-bold">{pokemon.name}</h1>
              <span className="text-sm bg-purple-600 text-white font-bold px-3 py-2">{pokemon.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
