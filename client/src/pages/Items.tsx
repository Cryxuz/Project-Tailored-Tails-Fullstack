import { useState, useEffect } from 'react'
import axios from 'axios'
import { ItemInterface } from '../interfaces/iteminterface'
import { Link } from 'react-router-dom'

const Items = () => {
  const [items, setItems] = useState<ItemInterface[]>([])

  useEffect(() => {
    axios
      .get<ItemInterface[]>('http://localhost:3000/items')
      .then((response) => {
        console.log(response.data)
        setItems(response.data)
      })
      .catch((error) => {
        console.error('Error fetching items:', error)
      })
  }, [])

  return (
    <div>
      <div className="grid grid-cols-2 pt-[5%] mx-10 mb-10">
        <div className='col-span-1 flex items-center justify-center bg-cyan-100'>
        <img className="w-[60%] rotate-[-15deg] rounded-lg" src="/images/items-page.jpg" alt="" />
        </div>
        <div className='col-span bg-cyan-50 p-10'>
          <h2 className="text-5xl px-[3%]">Costumes, Hats, Accessories & More!</h2>
          <br />
          <p className="text-xl p-[3%]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum eligendi aliquid, fugiat assumenda dicta amet quas animi iure repudiandae? Impedit, illo cum id eligendi sapiente ducimus veniam aperiam maiores ratione.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6  p-16 ">
        {items.map((item) => (
          <div key={item._id} className="border rounded-lg p-8 flex flex-col ">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p>{item.description}</p>
            
            <div className="flex-grow "></div>
            <div className='flex justify-center '>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-[300px] h-[200px] m-4 rounded-md"
            />
            </div>
            <div className="mt-2">
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
              <p>Rating: {item.rating}</p>
              <p>Stock: {item.stock}</p>
              <div className='flex gap-2 '>
                <button className='p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4'>Add To Cart</button>
                <Link to={`/items/${item._id}`}>
                  <button className='p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4'>View Item</button>
                </Link>              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Items
