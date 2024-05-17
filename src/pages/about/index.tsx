import Image from "next/image";

const About = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">About</h1>
            </header>
            <section className="text-center">
                <h1 className="text-2xl font-bold mb-4">This application made possible by using:</h1>
                <Image src="/pokeapi.png" alt="PokéAPI Logo" className="mx-auto mb-4 max-w-xl" />
                <p className="text-lg text-gray-700 mb-8">
                Created by Paul Hallett and other PokéAPI contributors around the world.
                <br />
                Pokémon and Pokémon character names are trademarks of Nintendo.
                </p>
            </section>
        </div>
    );
};

export default About;