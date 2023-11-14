import axios from 'axios'
import { useSelector } from 'react-redux'
import { setHeaders, url } from '../features/api'

const CheckoutButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth)

  const handleCheckout = () => {
    axios
      .post(
        `${url}stripe/create-checkout-session`,
        {
          cartItems,
          userId: user._id,
        },
        { ...setHeaders(), withCredentials: true }
      )
      .then((res) => {
        console.log('response',res)
        if (res.data.url) {
          window.location.href = res.data.url
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <>
      <button
        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => handleCheckout()}
      >
        Checkout
      </button>
    </>
  )
}

export default CheckoutButton
