import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ItemInterface } from '../interfaces/iteminterface'
import { IShopContext, ShopContext } from '../hooks/shop-context'

const Cart = () => {
  const { itemId } = useParams()
  const [items, setItems] = useState<ItemInterface[] | null>(null)

  const shopContext = useContext(ShopContext)
  // const { getTotalCartAmount } = useContext<IShopContext>(ShopContext)
  // const totalAmount = getTotalCartAmount()
  useEffect(() => {
    axios
      .get<ItemInterface[]>(`http://localhost:3000/cart`)
      .then((response) => {
        setItems(response.data)
      })
      .catch((error) => {
        console.error('Error fetching items:', error)
      })
  }, [itemId])
  if (items === null) {
    return <div>Loading...</div>
  }

  const filteredItems = items.filter((item, index) =>
    [25, 2, 22, 0].includes(index)
  )

  return (
    <div>
      <div className="md:grid md:grid-cols-4 gap-[2%] p-10">
        <div className="col-span-3 bg-sky-300">
          <div className="md:grid md:grid-cols-4 gap-[2%] p-10">
            <div className="col-span-3 bg-sky-300">
              {/* Render the items in the cart */}
              {items.map((item) => {
                const cartItemCount = shopContext.getCartItemCount(item._id)

                if (cartItemCount > 0) {
                  return (
                    <div key={item._id}>
                      {/* Display cart item details here */}
                      <p>{item.name}</p>
                      <img src={item.imageUrl} alt={item.name} />
                      <p>Quantity: {cartItemCount}</p>
                      <p>Price: {item.price}</p>
                      {/* add delete/subtract and add quantity btn ?? ask kadin */}
                      {/* <p>Total: {totalAmount.toFixed(2)}</p> */}
                    </div>
                  )
                }

                return null
              })}
            </div>
            <button className="p-2 bg-orange-600 hover-bg-orange-500 rounded-lg text-white md:hidden my-[3%]">
              Checkout
            </button>
            {/* Rest of your cart page content */}
          </div>
        </div>
        <button className="p-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-white md:hidden my-[3%]">
          Checkout
        </button>
        <div>
          <h3 className="text-lg font-bold">Delivery Options</h3>
          <p>NZ-wide from $5.95</p>
          <p>Same day delivery for $9.99</p>
          <p>Rural delivery available</p>
          <p>International delivery available</p>
          <br />
          <h3 className="text-lg font-bold py-[5%]">Payment Options</h3>
          <div>
            <p>
              <img src="/images/card.png" alt="master-card logo" />
              <img src="images/visa.png" alt="visa logo" />
              <img src="/images/paypal-logo.png" alt="paypal logo" />
            </p>
          </div>
          <p>Internet Banking</p>
          <p>POLi</p>
          <p>Zip</p>
          <p>Afterpay</p>
          <p>Online EFTPOS</p>
          <p>Payment on collection from Fake Adress, Auckland</p>
          <button className="p-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-white hidden md:block my-[3%]">
            Checkout
          </button>
        </div>
      </div>

      {/* Suggestions */}

      <p className="text-center text-2xl font-bold">
        Suggestions from our best sellers
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-4 md:p-16">
        {filteredItems.map((item) => (
          <div className="text-xl font-semibold border p-4 m-4 rounded-lg shadow-xl">
            {item.name}
            <img key={item._id} src={item.imageUrl} alt={item.name} />
            <p>
              <span className="font-medium text-lg">Category: </span>{' '}
              {item.category}
            </p>
            <p>
              <span className="font-medium text-lg">Price:</span> ${item.price}
            </p>
            <p>
              <span className="font-medium text-lg">Rating:</span>{' '}
              {(() => {
                switch (item.rating) {
                  case 1:
                    return '★☆☆☆☆'
                  case 2:
                    return '★★☆☆☆'
                  case 3:
                    return '★★★☆☆'
                  case 4:
                    return '★★★★☆'
                  case 5:
                    return '★★★★★'
                  default:
                    return 'Not rated'
                }
              })()}
            </p>
            <p>
              <span
                className={item.stock === 0 ? 'text-red-500' : 'text-green-700'}
              >
                {item.stock === 0 ? 'Out of Stock' : 'In Stock'}
              </span>
            </p>
            {item.stock > 0 ? (
              <div className="flex gap-2 flex-end">
                <button className="p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4">
                  Add To Cart
                </button>
              </div>
            ) : (
              <div className="flex  gap-2">
                <div className="p-2 bg-red-600 rounded-lg text-white mt-4">
                  Out of Stock
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
