/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// function Card() {
//   const cardRef = useRef(null);

//   useEffect(() => {
//     // GSAP animation for hover effect
//     const card = cardRef.current;
//     gsap.set(card, { scale: 1 });
//     card.addEventListener('mouseenter', () => {
//       gsap.to(card, { scale: 1.05, duration: 0.3 });
//     });
//     card.addEventListener('mouseleave', () => {
//       gsap.to(card, { scale: 1, duration: 0.3 });
//     });
//   }, []);

//   return (
//     <div
//       ref={cardRef}
//       className="relative bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transform transition-all duration-300 max-w-sm"
//     >
//       {/* Wishlist Icon */}
//       <div className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full shadow hover:bg-pink-600 hover:text-white cursor-pointer">
//         <i className="fas fa-heart"></i>
//       </div>

//       {/* Product Image */}
//       <div className="relative overflow-hidden rounded-xl group">
//         <img
//           src="https://html.pixelfit.agency/pesco/assets/images/products/feature-product-1.png"
//           alt="Product"
//           className="w-full h-64 object-cover"
//         />
//         {/* Hover Actions */}
//         <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-4 transition-opacity duration-300">
//           <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white">
//             View Details
//           </button>
//           <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white">
//             Quick View
//           </button>
//         </div>
//       </div>

//       {/* Product Details */}
//       <div className="mt-4 text-center">
//         <h3 className="text-xl font-semibold text-gray-800">Trendy Summer Dress</h3>
//         <p className="text-gray-500">Exclusive Kids & Adults Collection</p>
//         <div className="flex items-center justify-center mt-2 space-x-2">
//           {/* Ratings */}
//           <i className="fas fa-star text-yellow-500"></i>
//           <i className="fas fa-star text-yellow-500"></i>
//           <i className="fas fa-star text-yellow-500"></i>
//           <i className="fas fa-star text-yellow-500"></i>
//           <i className="fas fa-star-half-alt text-yellow-500"></i>
//           <span className="text-gray-500">(4.5)</span>
//         </div>
//         {/* Price and Discount */}
//         <div className="mt-2">
//           <span className="text-xl font-bold text-pink-600">$35.00</span>
//           <span className="text-sm text-gray-500 line-through ml-2">$50.00</span>
//           <span className="ml-2 text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full">
//             30% OFF
//           </span>
//         </div>
//       </div>

//       {/* Add to Cart Button */}
//       <div className="mt-4 text-center">
//         <button className="bg-gray-800 text-white px-8 py-2 rounded-full hover:bg-pink-700 transition-all">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Card;


import React, { useEffect, useRef } from 'react'
import { FaHeart } from 'react-icons/fa';

import { gsap } from 'gsap';
import { GiBeveledStar } from 'react-icons/gi';
import Link from 'next/link';
function Card({product,index}) {

  const cardRef = useRef([]);
  const hoverContentRef = useRef([]);

  useEffect(() => {
    cardRef.current.forEach((card, index) => {
      const hoverContent = hoverContentRef.current[index];

      // Default setup for hover content
      gsap.set(hoverContent, { opacity: 0, y: 20 });

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
        gsap.to(hoverContent, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' });
        gsap.to(hoverContent, { opacity: 0, y: 20, duration: 0.3, ease: 'power1.out' });
      });
    });
  }, []);
  return (
    <div
    key={product.id}
    ref={(el) => (cardRef.current[index] = el)}
    className="relative bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300"
  >
    {/* Wishlist Icon */}
    <div
    
    className="absolute top-3 right-3 bg-gray-100 text-orange-600 border border-orange-600  p-2 rounded-full shadow hover:bg-pink-600 hover:text-white cursor-pointer z-10">
      <FaHeart />
    </div>

    {/* Product Image */}
    <div className="relative aspect-w-1 aspect-h-1">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-64 object-cover rounded-t-lg"
      />
    </div>

    {/* Hover Content */}
    <div
      ref={(el) => (hoverContentRef.current[index] = el)}
      className="absolute cursor-pointer inset-0 bg-black bg-opacity-20 opacity-0 flex justify-center items-center gap-3 transition-opacity pointer-events-none"
    >
      <button className="bg-black text-sm cursor-pointer  text-white border-2 border-orange-600  p-2 rounded-full hover:bg-pink-600 hover:text-white">
        View Details
      </button>
      <button className="bg-black text-sm cursor-pointer  text-white border-2 border-orange-600   p-2 rounded-full hover:bg-pink-600 hover:text-white">
        Quick View
      </button>
    </div>

    {/* Product Info */}
    <div className="p-3 text-center">
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <div className="flex justify-center items-center mt-1 space-x-2 text-sm text-gray-600">
        <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{product.discount}</span>
        <span className="line-through">{product.oldPrice}</span>
        <span className="font-bold text-gray-800">{product.price}</span>
      </div>
      {/* Add to Cart Button */}
      <div className='flex justify-around'>
      <button className="mt-2 btn btn-xs bg-orange-600  text-white text-xs py-1 px-2  rounded-full hover:bg-pink-700 transition-all z-20 relative">
        Add to Cart 
      </button>
      <button  className="mt-2 btn btn-xs bg-black text-white text-xs py-1 px-2 rounded-full hover:bg-pink-700 transition-all z-20 relative">
   
        <Link
                // href="/auth/login"
                href={`/shop/${product?._id}`}
               
              >
                 Buy Now
             
              </Link>

      </button>
      </div>
    </div>
  </div>
  )
}

export default Card
