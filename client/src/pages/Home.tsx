import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'

function Home() {
  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-6xl font-bold mb-4">Tailored Tails</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio atque
            natus minus inventore, unde at dolorum consequatur non corporis quia
            dolor optio saepe laborum, expedita sequi distinctio culpa, adipisci
            nemo.
          </p>
          <Link to="/items" className="mt-6 inline-block">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              Check Out Our Products
            </button>
          </Link>
        </div>

        <img className="md:p-8 rounded-lg" src="/images/bg-home.jpg" alt="" />
      </div>

      <div className="mt-12">
        <Carousel />
      </div>
    </div>
  )
}

export default Home
