import { useState, useContext, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import axios from 'axios';
import Link from 'next/link';
import { PokemonCard } from '@/component/PokemonCard';
import { PokemonContext } from '@/providers/PokemonList';
import useSWR from 'swr';

export const Dashboard = () => {
    const { pokemon, setPokemon } = useContext(PokemonContext);
    const [next, setNext] = useState<string>('');
    const [prev, setPrev] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        const item = localStorage.getItem('pokemonState') ;
        if (item) {
            const savedState = JSON.parse(item);
            setPokemon(savedState.pokemon);
            setNext(savedState.next);
            setPrev(savedState.prev);
            setUrl(savedState.url);
        } else {
            setUrl('https://pokeapi.co/api/v2/pokemon');
        }
    }, [setPokemon]);

    const fetcher = async (url: string) => {
        const response = await axios.get(url);
        return response.data;
    };

    const { data, error, isLoading } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        refreshInterval: 0,
    });

    useEffect(() => {
        if (data) {
            const newState = {
                pokemon: data.results,
                next: data.next,
                prev: data.previous,
                url,
            };
            setPokemon(data.results);
            setNext(data.next);
            setPrev(data.previous);
            localStorage.setItem('pokemonState', JSON.stringify(newState));
        }
    }, [data, url, setPokemon]);

    const handlePrevClick = () => {
        if (prev) {
            setUrl(prev);
        }
    };

    const handleNextClick = () => {
        if (next) {
            setUrl(next);
        }
    };

    return (
        <div className="dashboard">
            <h1 className="text-center text-3xl font-bold">List of Pokémon</h1>
            <div className="flex justify-center my-4">
                <button
                    className="relative overflow-hidden border-2 border-yellow-500 rounded-md bg-red-500 hover:bg-red-600 mr-2 px-6 py-3 text-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handlePrevClick}
                    disabled={!prev || isLoading}
                >
                    Prev
                </button>
                <button
                    className="relative overflow-hidden border-2 border-yellow-500 rounded-md bg-red-500 hover:bg-red-600 px-6 py-3 text-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleNextClick}
                    disabled={!next || isLoading}
                >
                    Next
                </button>
            </div>
            {error ? (
                <div className="text-center text-3xl font-bold">
                    Fetching error, please try again!
                </div>
            ) : null}
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loading-spinner w-200 h-200 mb-2">
                        <FaSpinner className="spinner-icon w-200 h-200 text-blue-500" />
                        <h1>Loading...</h1>
                    </div>
                </div>
            ) : (
                <div className="list-container mx-auto my-4 py-4">
                    <div className="grid place-items-center grid-cols-2 md:grid-cols-4 gap-4">
                        {pokemon.length > 0 &&
                            pokemon.map((result, index) => (
                                <div key={index}>
                                    <Link href={`pokemon/${result.name}`}>
                                        <PokemonCard name={result.name} url={result.url} />
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};
