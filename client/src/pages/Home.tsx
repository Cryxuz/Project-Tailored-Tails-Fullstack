import { Link } from 'react-router-dom'

function Home () {
return (
  <div>
  <div className="grid grid-cols-2 justify-center items-center">
  <h1 className="m-auto text-8xl">Tailored Tails</h1>
    <img className="p-8 rounded-md" src="/images/bg-home.jpg" alt="" />
  </div>
  <Link className='flex justify-center' to="/items">
  <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Check Out Our Products</button>
  </Link>
  <div>
  <h1 className='text-center'>insert carousel here</h1>
  {/* carousel */}
  </div>
  </div>
)
}

export default Home