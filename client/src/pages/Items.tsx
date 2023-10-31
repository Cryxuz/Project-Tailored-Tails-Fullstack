import { useState, useEffect } from 'react'
import axios from 'axios'
import { ItemInterface } from '../interfaces/iteminterface'

const Items = () => {
  const [items, setItems] = useState<ItemInterface[]>([])

  useEffect(() => {
    axios
      .get<ItemInterface[]>('/items')
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
      <div className="grid grid-cols-2 gap-2 ">
        <img className="" src="/images/items-page.jpg" alt="" />
        <div>
          <h2 className="text-7xl pt-[8%] px-[3%]">Items</h2>
          <p className="text-2xl p-[3%]">
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
      <div>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ maxWidth: '200px' }}
              />
              <p>Rating: {item.rating}</p>
              <p>Stock: {item.stock}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Items
