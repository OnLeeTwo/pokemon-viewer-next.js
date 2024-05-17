import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import CapitalizeFirstLetter from "@/component/CapitalizeFirstLetter";
import { GetServerSideProps } from "next";
import { BsSearch } from "react-icons/bs";

interface PokemonStats {
    id: number;
    name: string;
    species: string;
    image: string;
    shiny: string;
    exp: string;
    hp: string;
    att: string;
    def: string;
    type: [];
}

interface PokemonProps {
    pokemon : PokemonStats
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params) {
        return {
            notFound: true,
        };
    }
    try {
        console.log("fetching data cuyy")
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        const char = await response.json();
        const pokemon: PokemonStats = {
            id: char.id,
            name: char.name,
            species: CapitalizeFirstLetter(char.species.name),
            image: char.sprites.front_default,
            shiny: char.sprites.front_shiny,
            exp: char.base_experience,
            hp: char.stats[0].base_stat.toString(),
            att: char.stats[1].base_stat.toString(),
            def: char.stats[2].base_stat.toString(),
            type: char.types          
        }
        return {
            props: {
                pokemon,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            notFound: true,
        };
    }
};

const PokemonName = ({pokemon} : PokemonProps) => {
    const router = useRouter();
    const {pokemonName} = router.query
    const [showShinySprite, setShowShinySprite] = useState(false);
    const [url, setUrl] = useState<string>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const [favoritePokemons, setFavoritePokemons] = useState<{ name: string; url: string; }[]>(() => {
        const storedFavorites = typeof window !== 'undefined' ? localStorage.getItem('favoritePokemons') : null;
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const searchTerm = inputValue.toLowerCase()
        router.push(`../pokemon/${searchTerm}`)
    };

    const handleChange = (e:any) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        if (pokemon.name !== pokemonName) {
            const newUrl = `../pokemon/${pokemon.name}`;
            router.replace(newUrl, undefined, { shallow: true });
        }
    }, [pokemon, pokemonName]);


    const goToPreviousPokemon = () => {
        const prevPokemonId = pokemon.id - 1;
        setUrl(`https://pokeapi.co/api/v2/pokemon/${prevPokemonId}`)
        router.push(`../pokemon/${prevPokemonId}`)
    };

    const goToNextPokemon = () => {
        const nextPokemonId = pokemon.id + 1;
        setUrl(`https://pokeapi.co/api/v2/pokemon/${nextPokemonId}`);
        router.push(`../pokemon/${nextPokemonId}`)
    };

    const addToFavorites = () => {
        const isFavorite = favoritePokemons.some(p => p.name === pokemon.name);
        const updatedFavorites = isFavorite
            ? favoritePokemons.filter(p => p.name !== pokemon.name)
            : [...favoritePokemons, { name: pokemon.name, url }];
    
        setFavoritePokemons(updatedFavorites);
        if (typeof window !== 'undefined') {
            localStorage.setItem('favoritePokemons', JSON.stringify(updatedFavorites));
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="flex items-center min-w-fit w-4/12 max-w-screen-md bg-white rounded-lg shadow-md my-4 p-2">
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Search a Pokémon by name or id"
                className="flex-grow min-w-0 p-2 border-none outline-none overflow-hidden text-overflow-ellipsis"
            />
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow-sm flex items-center">
                <BsSearch className="w-6 h-6 mr-2" />
                Search
            </button>
        </form>
            <div className="max-w-md bg-white rounded-lg shadow-md px-10 py-4 relative">
                <span className="absolute top-0 right-0 bg-gray-600 text-white px-2 py-1 rounded-bl-lg rounded-tr-lg">#{pokemon.id}</span>
                <h2 className="text-2xl text-center font-bold mb-4">{CapitalizeFirstLetter(pokemon.name)}</h2>
                <div className="flex mb-4">
                    <button
                        onClick={() => setShowShinySprite(false)}
                        disabled={!showShinySprite}
                        className="rounded-lg mx-2 px-4 py-2 bg-blue-500 disabled:bg-blue-600 text-white hover:bg-blue-600"
                    >
                        Standard
                    </button>
                    <button
                        onClick={() => setShowShinySprite(true)}
                        disabled={showShinySprite}
                        className= "rounded-lg mx-2 px-4 py-2 bg-blue-500 disabled:bg-blue-600 text-white hover:bg-blue-600 "
                    >
                        Shiny
                    </button>
                    </div>
                <img className="w-32 h-32 mb-4 mx-auto" src={showShinySprite ? pokemon.shiny : pokemon.image} alt={pokemon.name} />
                <div className="text-center mb-4">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow-sm" onClick={addToFavorites}>
                        {favoritePokemons.some(p => p.name === pokemon.name) ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>
                <div className="mb-4">
                    <p>Species: {pokemon.species}</p>
                    <p>Type: {pokemon.type.map((typeObj: any) => CapitalizeFirstLetter(typeObj.type.name)).join(", ")}</p>
                    <p>Exp: {pokemon.exp}</p>
                    <p>HP: {pokemon.hp}</p>
                    <p>Attack: {pokemon.att}</p>
                    <p>Defense: {pokemon.def}</p>
                </div>
                <button className="relative overflow-hidden border-2 border-yellow-500 rounded-md bg-red-500 hover:bg-red-600 px-6 py-3 mx-2 my-4 text-white font-bold transition duration-300 ease-in-out transform hover:scale-105" onClick={goToPreviousPokemon}>Prev</button>
                <button className="relative overflow-hidden border-2 border-yellow-500 rounded-md bg-red-500 hover:bg-red-600 px-6 py-3 mx-2 text-white font-bold transition duration-300 ease-in-out transform hover:scale-105" onClick={goToNextPokemon}>Next</button>
            </div>
        </div>
    );
};
export default PokemonName;


