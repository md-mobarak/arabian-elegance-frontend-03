import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';

export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const order = localStorage.getItem('orderDetails');
    if (order) {
      setOrderDetails(JSON.parse(order));
    }
    const items = localStorage.getItem('cart');
    if (items) {
      setCartItems(JSON.parse(items));
    }
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  const shippingCost = 120.00; // Example shipping cost
  const total = subtotal + shippingCost;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Order Details</h1>
          {orderDetails ? (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Billing Address</h2>
                <p className="text-gray-700">{orderDetails.fullName}</p>
                <p className="text-gray-700">{orderDetails.streetAddress}</p>
                <p className="text-gray-700">{orderDetails.city}, {orderDetails.division}</p>
                <p className="text-gray-700">{orderDetails.phone}</p>
                <p className="text-gray-700">{orderDetails.email}</p>
              </div>
              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold">Products:</h2>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b py-2">
                      <div>
                        <p className="text-gray-700">{item.name} × {item.quantity}</p>
                        <p className="text-gray-500">SIZE: {item.size}</p>
                      </div>
                      <p className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items in cart.</p>
                )}
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal:</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping:</p>
                  <p>${shippingCost.toFixed(2)} via Outside Dhaka</p>
                </div>
                <div className="flex justify-between font-bold">
                  <p>Total:</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Payment Method:</h2>
                <p className="text-gray-700">Cash on delivery</p>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Thank you. Your order has been received.</h2>
                <p className="text-gray-700">Order number: 206826</p>
                <p className="text-gray-700">Date: February 21, 2025</p>
                <p className="text-gray-700">Total: ${total.toFixed(2)}</p>
                <p className="text-gray-700">Payment method: Cash on delivery</p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No order details found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}