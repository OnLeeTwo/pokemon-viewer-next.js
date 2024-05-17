import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav className="bg-white sticky py-2 shadow-md top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center px-2 justify-between ">
          <Link href="/">
            <Image src="/pokemonviewer.png" alt="Pokémon Viewer Logo" className="w-24" />
          </Link>
          <ul className='flex flex-row gap-4'>
            <li>
              <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
            </li>
            <li>
              <Link href="/favorites" className="text-gray-700 hover:text-blue-500">Favorites</Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-700 hover:text-blue-500">About</Link>
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default Navbar