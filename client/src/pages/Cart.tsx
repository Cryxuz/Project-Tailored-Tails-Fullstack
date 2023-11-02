// import axios from "axios";
// import { useEffect, useState } from "react";
// import { ItemInterface } from "../interfaces/iteminterface";
// import { useParams } from "react-router-dom";

const Cart = () => {
  // const { itemId } = useParams()
  // const [item, setItem] = useState<ItemInterface | null>(null);
  // useEffect(() => {
  //   axios
  //     .get<ItemInterface>(`http://localhost:3000/items/${itemId}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setItem(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching item:', error);
  //     });
  // }, [itemId]);
  // if (item === null) {
  //   return <div>Loading...</div>;
  // }
  // console.log
  return (
  <div>
    <div className="md:grid md:grid-cols-4 gap-[2%] p-10">
      <div className="col-span-3 bg-sky-300">
        <h1>Delete divs when working with cart</h1>
        <div className="w-[100px] h-[100px] bg-slate-300">div</div>
        <div className="w-[100px] h-[100px] bg-slate-300">div</div>
        <div className="w-[100px] h-[100px] bg-slate-300">div</div>
        <div className="w-[100px] h-[100px] bg-slate-300">div</div>
      </div>
      <button className="p-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-white md:hidden my-[3%]">Checkout</button>
      <div>
        <h3 className="text-lg font-bold">Delivery Options</h3>
        <p>NZ-wide from $5.95</p>
        <p>Same day delivery for $9.99</p>
        <p>Rural delivery available</p>
        <p>International delivery available</p>
        <br />
        <h3 className="text-lg font-bold py-[5%]">Payment Options</h3>
        <div >
        <p><img src="/images/card.png" alt="master-card logo" /><img src="images/visa.png" alt="visa logo" /><img src="/images/paypal-logo.png" alt="paypal logo" /></p>
        </div>
        <p>Internet Banking</p>
        <p>POLi</p>
        <p>Zip</p>
        <p>Afterpay</p>
        <p>Online EFTPOS</p>
        <p>Payment on collection from Fake Adress, Auckland</p>
        <button className="p-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-white hidden md:block my-[3%]">Checkout</button>
      </div> 
    </div>
    {/* Suggestions
    <div>
    <p>Suggestions from our best sellers</p>
    <img
        src={item.imageUrl}/>
    </div> */}
  </div>
  )
}

export default Cart
