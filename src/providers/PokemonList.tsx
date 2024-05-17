import React, { ReactNode, SetStateAction, useState, createContext} from 'react'

export interface Pokemon {
    name: string
    url: string
}

export interface PokemonStats {
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


interface PokemonContextInterface {
    pokemon: Pokemon[];
    setPokemon: React.Dispatch<SetStateAction<Pokemon[]>>
}

export const PokemonContext = createContext<PokemonContextInterface>({
    pokemon: [],
    setPokemon: () => {},

}) ;

export const PokemonProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    return (
        <PokemonContext.Provider value={{ pokemon, setPokemon}}>
            {children}
        </PokemonContext.Provider>
    )
}