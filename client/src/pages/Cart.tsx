import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ItemInterface } from '../interfaces/iteminterface'
import { ShopContext } from '../hooks/shop-context'
import { Link } from 'react-router-dom'
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
      <div className="grid md:grid-cols-4 gap-[2%] p-10 ">
        <div className="col-span-3 bg-gray-50 rounded-lg">
          <div className="grid-cols-4 gap-[2%] p-10 ">
            <div className="col-span-3 bg-gray-50">
              {/* Render the items in the cart */}
              
              {items.map((item) => {
                const cartItemCount = shopContext.getCartItemCount(item._id)
                if (cartItemCount > 0) {
                  return (
                    <div className='grid grid-cols-4 gap-[5%]' key={item._id}>
                      <img className='col-span-1 rounded-md mb-[3%]' src={item.imageUrl} alt={item.name} />
                      <div className='col-span-1'>
                        <p className='font-bold text-xl'>{item.name}</p>
                        <p className='my-[3%]'>{item.description}</p>
                        <p>
                          <span className="font-medium text-lg">Rating:</span>
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
                      </div>
                        <p className='col-span-1 justify-self-center font-medium text-lg'>Quantity: <span className='rounded-md border border-gray-300 px-3 py-2'>{cartItemCount}</span></p>
                        <p className='col-span-1 justify-self-center font-medium text-lg'>Price: <span className='text-orange-600'>${item.price}.00</span></p>
                        
                        {/* add delete/subtract and add quantity btn ?? ask kadin */}
                        {/* <p>Total: {totalAmount.toFixed(2)}</p> */}
                      
                    </div>    
                  )    
                }

                
              })}
              
            </div>
            <div className='w-[30%] ml-auto'>
              
            <p className="text-lg font-bold self-end border-t-2 border-black py-8">
                Total Price: $
                {items.reduce((total, item) => {
                  const cartItemCount = shopContext.getCartItemCount(item._id);
                  return total + cartItemCount * item.price;
                }, 0).toFixed(2)}
                <div className='flex flex-col '>
                <button className="p-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-white hidden md:block my-[3%]">
                  Checkout
                </button>
                <Link
                  to="/items"
                  className="text-center p-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-white hidden md:block my-[3%]"
                >
                  Continue Shopping
                </Link>
                </div>
            </p>
            </div>
          
          </div>
        </div>

        <div className='hidden md:block '>
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