import { useState, useEffect } from 'react';
import axios from 'axios';
import {IconContext} from "react-icons"
import { FaStar, FaSpinner } from "react-icons/fa6";
import CapitalizeFirstLetter from './CapitalizeFirstLetter';

export const PokemonCard = ({ name, url }: { name: string; url: string }) => {
    const [pokemonSprite, setPokemonSprite] = useState<string>('');
    const [pokemonId, setPokemonId] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [favoritePokemons] = useState<{ name: string; url: string; }[]>(() => {
        const storedFavorites = localStorage.getItem('favoritePokemons');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    useEffect(() => {
        const getPokemonSprite = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url)
                const data = response.data;
                setPokemonId(data.id)
                setPokemonSprite(data.sprites.front_default);
                setLoading(false);
            } catch (error) {
                alert(error);
            }
        };

        getPokemonSprite();
    }, [url]);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center md:w-48 relative">
            {loading ? 
            <div className="loading-spinner w-24 h-24 mb-2">
                <FaSpinner className="spinner-icon" />
            </div>
            : <img src={pokemonSprite} alt={name} loading='lazy' className='w-24 h-24 mb-2'/>}
            <div className="text-lg font-semibold">{CapitalizeFirstLetter(name)}</div>
            <div className="favorite-icon absolute top-0 left-0 p-2">
                <p>{`#${pokemonId}`}</p>
            </div>
            {favoritePokemons.some(p => p.name === name) ? 
            <div className="favorite-icon absolute top-0 right-0 p-2">
                <IconContext.Provider value={{ color: "#F6BE00"}}>
                    <FaStar />
                </IconContext.Provider>
            </div>
            : <div></div>}
        </div>
    );
};
