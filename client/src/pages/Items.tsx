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
      <div className="grid grid-cols-3 gap-2 pt-[5%]">
        <div className='col-span-1 flex items-center justify-center'>
        <img className="w-[80%] rounded-lg" src="/images/items-page.jpg" alt="" />
        </div>
        <div className='col-span-2'>
          <h2 className="text-5xl px-[3%]">Costumes, Hats, Accessories & More!</h2>
          <p className="text-xl p-[3%]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis a, sint soluta corrupti sed aperiam amet iure. Magnam
            doloremque cum distinctio animi recusandae assumenda, minima
            delectus debitis ex, temporibus dolor. Tempore autem eos neque!
            Tenetur eaque natus, inventore pariatur beatae nisi quisquam aut
            optio itaque, reprehenderit eligendi, ipsa repudiandae. Soluta
            exercitationem fugit facere esse at magni dignissimos, placeat ipsam
            excepturi. Dignissimos iste ducimus vitae dolorem dolore dicta.
            Provident neque molestias vero unde cumque esse facilis illum.
            Consectetur, magnam quos praesentium, aperiam molestias sint quae
            explicabo ipsa ratione sequi minima odio.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6 p-12">
        {items.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 flex flex-col">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p>{item.description}</p>
            <p>Category: {item.category}</p>
            <p>Price: ${item.price}</p>
            <div className="flex-grow"></div>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="max-w-full h-[200px]"
            />
            <div className="mt-2">
              <p>Rating: {item.rating}</p>
              <p>Stock: {item.stock}</p>
              <div className='flex gap-2 justify-center'>
                <button className='p-2 bg-sky-500 rounded-lg text-white hover:bg-sky-400 mt-4'>Add To Cart</button>
                <Link to={`/items/${item._id}`}>
                  <button className='p-2 bg-sky-500 rounded-lg text-white hover:bg-sky-400 mt-4'>View Item</button>
                </Link>              
              </div>
              <button className="p-2 bg-sky-500 rounded-lg text-white hover:bg-sky-400">
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Items
