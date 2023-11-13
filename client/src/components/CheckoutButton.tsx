import axios from 'axios'
import { useSelector } from 'react-redux'

const CheckoutButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth)

  const handleCheckout = () => {
    axios
      .post('http://localhost:3000/stripe/create-checkout-session', {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.data.url) {
          window.location.href = res.data.data.url
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
