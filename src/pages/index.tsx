import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Dashboard } from '@/component/Dashboard';
import { PokemonProvider } from '@/providers/PokemonList';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const searchTerm = inputValue.toLowerCase()
        router.push(`pokemon/${searchTerm}`)
    };

    const handleChange = (e:any) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="flex flex-col items-center">
            <header className="bg-orange-500 text-white py-4 px-4 text-center w-full">
                <Image src="/pokemonviewer.png" alt="Pokémon Viewer Logo" className="mx-auto w-1/4" />
                <h1 className="text-3xl font-bold mb-2">Welcome to the Pokémon Viewer Website!</h1>
                <h2 className="text-lg font-medium">Explore or search over 1000+ Pokémon available in the API</h2>
            </header>
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
            <PokemonProvider>
                <Dashboard />
            </PokemonProvider>
        </div>
    );
};

export default Home;
