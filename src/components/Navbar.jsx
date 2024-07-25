import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-600'>
      <div className="container flex text-white justify-between items-center mx-auto md:h-16">

        <div className="logo text-2xl font-bold flex justify-center items-center">
          <span>
          <img src="/public/favicon.png" alt="" className='w-10' />
          </span>
          <span className='text-green-600'>&lt;</span>
          Pass
          <span className='text-green-600'>OP/&gt;</span>
        </div>
        {/* <ul >
          <li className='flex gap-6'>
            <a className='hover:font-bold hover:text-green-600' href="/">Home</a>
            <a className='hover:font-bold hover:text-green-600' href="/">About</a>
            <a className='hover:font-bold hover:text-green-600' href="/">Contant</a>
          </li>
        </ul> */}

        <button className='text-white bg-green-700 my-5 mx-2 rounded-full flex  justify-between items-center ring-white ring-1'>
          <img className='invert  w-10 p-1' src="/icons/github.svg" alt="github logo" />
          <span className='font-bold px-2'>GitHub</span>

        </button>
      </div>
    </nav>
  )
}

export default Navbar
