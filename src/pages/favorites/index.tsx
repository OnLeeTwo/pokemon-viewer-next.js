import Link from "next/link";
import { PokemonCard } from "@/component/PokemonCard";
import { Pokemon } from "@/providers/PokemonList";

const Favorite = () => {
    const storedPokemon = localStorage.getItem('favoritePokemons');
    const pokemon: Pokemon[] = storedPokemon ? JSON.parse(storedPokemon) : [];
    
    return (
        <div className="flex flex-col items-center max-w-full mx-auto px-4 py-8">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">Favorited Pokemon</h1>
            </header>
            {pokemon.length <= 0? <h1>You have no pokemon that you add to the favorite list, please add new one from the list!</h1> : 
            <div className="list-container mx-auto my-4 py-4">
                <div className="grid place-items-center grid-cols-2 md:grid-cols-4 gap-4">
                    {pokemon.map((result, index) => (
                            <div key={index}>
                                <Link href={`pokemon/${result.name}`}>
                                    <PokemonCard name={result.name} url={result.url} />
                                </Link>
                            </div>
                    ))}
                </div>
            </div>
            }
        </div>
    )
}

export default Favorite