"use client";
import React, { useState, useEffect } from 'react';

export default function CheckoutDetails() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const shippingCost = 120.00; // Example shipping cost

  useEffect(() => {
    // Ensure this runs only on the client side
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);

    const calculatedSubtotal = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
    setSubtotal(calculatedSubtotal);
    setTotal(calculatedSubtotal + shippingCost);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }
    const orderDetails = { fullName, email, division, city, phone, streetAddress, orderNotes };
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email Address (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Division / District *"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="City / Thana *"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Phone *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Street Address *"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Order notes (optional)"
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
          />
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">Your Order</h2>
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <p>{item.name} x {item.quantity}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>${shippingCost.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2"
                required
              />
              <span>I have read and agree to the website Terms and conditions *</span>
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            PLACE ORDER
          </button>
        </form>
      </div>
    </div>
  );
}