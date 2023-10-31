const Cart = () => {
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
        <h3 className="text-lg font-bold">Payment Options</h3>
        <p>Visa, Mastercard & Amex</p>
        <p>Internet Banking</p>
        <p>POLi</p>
        <p>Zip</p>
        <p>Afterpay</p>
        <p>PayPal</p>
        <p>Online EFTPOS</p>
        <p>Payment on collection from Fake Adress, Auckland</p>
        <button className="p-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-white hidden md:block my-[3%]">Checkout</button>
      </div>
      
    </div>
  </div>
  )
}

export default Cart
