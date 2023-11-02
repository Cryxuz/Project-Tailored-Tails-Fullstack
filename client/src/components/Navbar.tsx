import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const Navbar = () => {

  const [open, setOpen] = useState(false)

  const handleMenu = () => {
    setOpen((prev) => !prev)
  }

  return (
    <nav className=" py-[1%] border-b shadow-md px-[3%]">
      <div>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-4xl font-semibold cursive hidden md:block">
          <img className="inline pr-5" src="/images/logo.png" alt="" />
          Tailored Tails
        </div>
        <div className="space-x-10 hidden md:block">
          <Link
            to="/"
            className="text-black font-semibold hover:underline merriweather text-xl"
          >
            Home
          </Link>
          <Link
            to="/items"
            className="text-black font-semibold hover:underline merriweather text-xl"
          >
            Items
          </Link>
          <Link
            to="/category"
            className="text-black font-semibold hover:underline merriweather text-xl"
          >
            Category
          </Link>
          <Link
            to="/cart"
            className="text-black font-semibold hover:underline merriweather text-xl"
          >
            Cart
          </Link>
        </div>
        {/* Hamburger menu */}
        <div className="-mr-2 flex border-2 border-black rounded-lg md:hidden">
            <button
              type="button"
              onClick={handleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black hover:bg-gray-500 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open Main Menu</span>
              {open ? <FaTimes /> : <FaBars />}
            </button>
        </div>
        </div>
        {open ? (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col text-slate-800">
          <Link
            to="/"
            className="text-black font-semibold hover:underline merriweather text-xl"
          >
            Home
          </Link>
          <Link
            to="/items"
            className="text-black font-semibold hover:underline merriweather text-xl"
          >
            Items
          </Link>
          <Link
            to="/category"
            className="text-black font-semibold hover:underline merriweather text-xl"
          >
            Category
          </Link>
          <Link
            to="/cart"
            className="text-black font-semibold hover:underline merriweather text-xl"
          >
            Cart
          </Link>
          </div>
        </div>
      ) : null}
      </div>
    </nav>
  )
}

export default Navbar