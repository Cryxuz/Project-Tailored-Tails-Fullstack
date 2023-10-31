import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">Tailored Tails</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/items" className="text-white hover:text-gray-300">
            Items
          </Link>
          <Link to="/cart" className="text-white hover:text-gray-300">
            Category
          </Link>
          <Link to="/category" className="text-white hover:text-gray-300">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
