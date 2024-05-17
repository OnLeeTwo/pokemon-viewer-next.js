import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div>
        <h1 className="text-3xl font-bold">Pokemon not found!</h1> 
        <h2 className="text-center font-bold underline"><Link href="/">Go back to home</Link></h2>
    </div>
  )
}

export default NotFound