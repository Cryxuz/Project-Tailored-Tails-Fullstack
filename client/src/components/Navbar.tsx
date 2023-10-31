import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-sky-200 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-cyan-800 text-4xl font-semibold cursive"><img src="" alt="" />Tailored Tails</div>
        <div className="space-x-10">
          <Link to="/" className="text-cyan-800 font-semibold hover:underline merriweather text-xl">
            Home
          </Link>
          <Link to="/items" className="text-cyan-800 font-semibold hover:underline merriweather text-xl">
            Items
          </Link>
          <Link to="/category" className="text-cyan-800 font-semibold hover:underline merriweather text-xl">
            Category
          </Link>
          <Link to="/cart" className="text-cyan-800 font-semibold hover:underline merriweather text-xl">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;