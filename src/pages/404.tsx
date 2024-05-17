import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold">404</h1> 
        <h1 className="text-3xl font-bold">Page not found!</h1> 
        <h2 className="text-center font-bold underline"><Link href="/">Go back to home</Link></h2>
    </div>
  )
}

export default NotFound