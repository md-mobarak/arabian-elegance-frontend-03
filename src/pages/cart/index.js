import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve 'cart' items from localStorage
    const items = localStorage.getItem('cart');
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  const shippingCost = 120.00; // Example shipping cost
  const grandTotal = total + shippingCost;

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  return (
  <div>
    {/* <Navbar></Navbar> */}
    <div className="min-h-screen bg-gray-100 py-10 ">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500">
            Your cart is empty. Please add to cart.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-2">
              <div className="col-span-2">PRODUCT</div>
              <div>PRICE</div>
              <div>QUANTITY</div>
              <div>SUBTOTAL</div>
            </div>
            {cartItems.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 py-4 border-b">
                <div className="col-span-2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.category}</p>
                </div>
                <div>${item.price}</div>
                <div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    className="w-16 text-center border rounded"
                    min="1"
                  />
                </div>
                <div>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
            <div className="mt-6">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>${shippingCost.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${grandTotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
                CONTINUE SHOPPING
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    <Footer></Footer>
  </div>
  );
}