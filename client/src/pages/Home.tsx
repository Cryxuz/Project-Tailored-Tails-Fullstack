import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'

function Home() {
  return (
    <div>
      <div className="grid grid-cols-2 justify-center items-center">
        <div>
          <h1 className="m-auto text-8xl">Tailored Tails</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio atque
            natus minus inventore, unde at dolorum consequatur non corporis quia
            dolor optio saepe laborum, expedita sequi distinctio culpa, adipisci
            nemo.
          </p>
        </div>

        <img className="p-8 rounded-lg" src="/images/bg-home.jpg" alt="" />
      </div>
      <Link className="flex justify-center" to="/items">
        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Check Out Our Products
        </button>
      </Link>
      <div>
        <h1 className="text-center">insert carousel here</h1>
        <Carousel />
      </div>
    </div>
  )
}

export default Home
