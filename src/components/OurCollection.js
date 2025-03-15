// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { GiBeveledStar } from "react-icons/gi";

// function CompactCard() {
//   const cardRef = useRef([]);
//   const hoverRef = useRef([]);

//   useEffect(() => {
//     // Animation for hover scaling effect
//     cardRef.current.forEach((card, index) => {
//       gsap.set(card, { scale: 1 });
//       card.addEventListener('mouseenter', () => {
//         gsap.to(card, { scale: 1.05, duration: 0.3 });
//         gsap.to(hoverRef.current[index], { opacity: 1, duration: 0.3 });
//       });
//       card.addEventListener('mouseleave', () => {
//         gsap.to(card, { scale: 1, duration: 0.3 });
//         gsap.to(hoverRef.current[index], { opacity: 0, duration: 0.3 });
//       });
//     });
//   }, []);

//   const products = [
//     {
//       id: 1,
//       name: "Summer Dress",
//       price: "$35.00",
//       oldPrice: "$50.00",
//       discount: "30% OFF",
//       rating: 4.5,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-1.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//     {
//       id: 2,
//       name: "Winter Coat",
//       price: "$60.00",
//       oldPrice: "$80.00",
//       discount: "25% OFF",
//       rating: 4.7,
//       img: "https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png",
//     },
//   ];

//   return (
//     <div className="my-8 px-4">
//       <div className="mb-6 text-center">
//         <h2 className="text-3xl font-bold font-serif">
//           <GiBeveledStar className="inline-block text-pink-700" /> Featured
//           Collection
//         </h2>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {products.map((product, index) => (
//           <div
//             key={product.id}
//             ref={(el) => (cardRef.current[index] = el)}
//             className="relative bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300"
//           >
//             {/* Wishlist Icon */}
//             <div className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full shadow hover:bg-pink-600 hover:text-white cursor-pointer z-10">
//               <i className="fas fa-heart"></i>
//             </div>

//             {/* Product Image */}
//             <div className="relative">
//               <img
//                 src={product.img}
//                 alt={product.name}
//                 className="w-full h-48 object-cover"
//               />
//               {/* Hidden Hover Actions */}
//               <div
//                 ref={(el) => (hoverRef.current[index] = el)}
//                 className="absolute inset-0 bg-black bg-opacity-50 opacity-0 flex justify-center items-center gap-3 transition-opacity"
//               >
//                 <button className="bg-white text-black px-3 py-1 rounded-full hover:bg-pink-600 hover:text-white">
//                   View Details
//                 </button>
//                 <button className="bg-white text-black px-3 py-1 rounded-full hover:bg-pink-600 hover:text-white">
//                   Quick View
//                 </button>
//               </div>
//             </div>

//             {/* Product Info */}
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800 truncate">
//                 {product.name}
//               </h3>
//               {/* Hidden on default */}
//               <div className="hidden sm:block">
//                 <div className="flex justify-between items-center mt-2">
//                   <span className="text-pink-600 text-sm font-semibold">
//                     {product.discount}
//                   </span>
//                   <span className="text-gray-500 text-sm line-through">
//                     {product.oldPrice}
//                   </span>
//                 </div>
//                 <div className="mt-1">
//                   <span className="text-lg font-bold text-gray-800">
//                     {product.price}
//                   </span>
//                 </div>
//               </div>

//               {/* Add to Cart Button */}
//               <div className="mt-4 text-center">
//                 <button className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-all">
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CompactCard;





// another card 





// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// function StylishCard() {
//   const cardRef = useRef([]);
//   const hoverContentRef = useRef([]);

//   useEffect(() => {
//     cardRef.current.forEach((card, index) => {
//       const hoverContent = hoverContentRef.current[index];

//       // Default setup for hover content
//       gsap.set(hoverContent, { opacity: 0, y: 20 });

//       card.addEventListener('mouseenter', () => {
//         gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
//         gsap.to(hoverContent, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' });
//       });

//       card.addEventListener('mouseleave', () => {
//         gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' });
//         gsap.to(hoverContent, { opacity: 0, y: 20, duration: 0.3, ease: 'power1.out' });
//       });
//     });
//   }, []);

//   const products = [
//     {
//       id: 1,
//       name: 'Classic Shirt',
//       price: '$29.99',
//       oldPrice: '$39.99',
//       discount: '25% OFF',
//       rating: 4.3,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//   ];

//   return (
//     <div className="my-8 px-6">
//       <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Our Exclusive Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {products.map((product, index) => (
//           <div
//             key={product.id}
//             ref={(el) => (cardRef.current[index] = el)}
//             className="relative bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300"
//           >
//             {/* Wishlist Icon */}
//             <div className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full shadow hover:bg-pink-600 hover:text-white cursor-pointer z-10">
//               <i className="fas fa-heart"></i>
//             </div>

//             {/* Product Image */}
//             <div className="relative">
//               <img
//                 src={product.img}
//                 alt={product.name}
//                 className="w-full h-40 object-cover rounded-t-lg"
//               />
//             </div>

//             {/* Hover Content */}
//             <div
//               ref={(el) => (hoverContentRef.current[index] = el)}
//               className="absolute inset-0 bg-black bg-opacity-50 opacity-0 flex justify-center items-center gap-3 transition-opacity"
//             >
//               <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white">
//                 View Details
//               </button>
//               <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white">
//                 Quick View
//               </button>
//             </div>

//             {/* Product Info */}
//             <div className="p-3 text-center">
//               <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
//               <div className="flex justify-center items-center mt-2 space-x-2 text-sm text-gray-600">
//                 <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{product.discount}</span>
//                 <span className="line-through">{product.oldPrice}</span>
//                 <span className="font-bold text-gray-800">{product.price}</span>
//               </div>
//               {/* Add to Cart Button */}
//               <button className="mt-3 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-all">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StylishCard;


// 3rd card desing 


// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useRef } from 'react';
// import { FaHeart } from "react-icons/fa";
// import { gsap } from 'gsap';

// function StylishCard() {
//   const cardRef = useRef([]);
//   const hoverContentRef = useRef([]);

//   useEffect(() => {
//     cardRef.current.forEach((card, index) => {
//       const hoverContent = hoverContentRef.current[index];

//       // Default setup for hover content
//       gsap.set(hoverContent, { opacity: 0, y: 20 });

//       card.addEventListener('mouseenter', () => {
//         gsap.to(card, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
//         gsap.to(hoverContent, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.out' });
//       });

//       card.addEventListener('mouseleave', () => {
//         gsap.to(card, { scale: 1, duration: 0.3, ease: 'power1.out' });
//         gsap.to(hoverContent, { opacity: 0, y: 20, duration: 0.3, ease: 'power1.out' });
//       });
//     });
//   }, []);

//   const products = [
//     {
//       id: 1,
//       name: 'Classic Shirt',
//       price: '$29.99',
//       oldPrice: '$39.99',
//       discount: '25% OFF',
//       rating: 4.3,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png',
//     },
//     {
//       id: 2,
//       name: 'Stylish Jacket',
//       price: '$49.99',
//       oldPrice: '$69.99',
//       discount: '30% OFF',
//       rating: 4.7,
//       img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
//     },
//   ];

//   return (
//     <div className="my-8 px-6">
//       <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Our Exclusive Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {products.map((product, index) => (
//           <div
//             key={product.id}
//             ref={(el) => (cardRef.current[index] = el)}
//             className="relative bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300"
//           >
//             {/* Wishlist Icon */}
//             <div className="absolute top-3 right-3 bg-gray-100 p-2 rounded-full shadow hover:bg-pink-600 hover:text-white cursor-pointer z-10">
//             <FaHeart />
//             </div>

//             {/* Product Image */}
//             <div className="relative">
//               <img
//                 src={product.img}
//                 alt={product.name}
//                 className="  rounded-t-lg"
//               />
//             </div>

//             {/* Hover Content */}
//             <div
//               ref={(el) => (hoverContentRef.current[index] = el)}
//               className="absolute inset-0 bg-black bg-opacity-50 opacity-0 flex justify-center items-center gap-3 transition-opacity pointer-events-none"
//             >
//               <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white">
//                 View Details
//               </button>
//               <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-pink-600 hover:text-white">
//                 Quick View
//               </button>
//             </div>

//             {/* Product Info */}
//             <div className="p-3 text-center">
//               <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
//               <div className="flex justify-center items-center mt-2 space-x-2 text-sm text-gray-600">
//                 <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{product.discount}</span>
//                 <span className="line-through">{product.oldPrice}</span>
//                 <span className="font-bold text-gray-800">{product.price}</span>
//               </div>
//               {/* Add to Cart Button */}
//               <button className="mt-3 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-all z-20 relative">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default StylishCard;


// 4th card desgin 
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react';
import { FaHeart } from "react-icons/fa";
import { gsap } from 'gsap';
import { GiBeveledStar } from 'react-icons/gi';
import Card from './Card';

function StylishCard() {
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

 const products = [
    {
      id: 1,
      name: 'Classic Shirt',
      price: '$29.99',
      oldPrice: '$39.99',
      discount: '25% OFF',
      rating: 4.3,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-1.png',
    },
    {
      id: 1,
      name: 'Classic Shirt',
      price: '$29.99',
      oldPrice: '$39.99',
      discount: '25% OFF',
      rating: 4.3,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-2.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-3.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-4.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-5.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-6.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-6.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-7.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-8.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-9.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-10.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-11.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-12.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-13.png',
    },
    {
      id: 2,
      name: 'Stylish Jacket',
      price: '$49.99',
      oldPrice: '$69.99',
      discount: '30% OFF',
      rating: 4.7,
      img: 'https://html.pixelfit.agency/pesco/assets/images/products/feature-product-14.png',
    },
  
  ];

  return (
    <div className="my-8 lg:px-12 px-8">
     
<div className='grid grid-cols-2 gap-5 lg:my-16' >
<div className='my-5'>
<div className='flex  items-center'>
    <p><GiBeveledStar className='text-pink-700 font-bold text-xl' /></p>
    <p className='font-serif lg:font-semibold text-pink-700'>Feature Products</p>
</div>
<h2 className="lg:text-4xl font-bold text-gray-600 font-serif">Our Features Collection</h2>
</div>
<div className='my-5 grid grid-cols-3 lg:border-2 gap-2  lg:font-semibold border-orange-600 rounded-full lg:px-3 lg:py-2 '>
    <button className=' lg:rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 lg:text-[16px] text-[10px] border lg:border-none rounded-xl'>New Products</button>
    <button className=' lg:rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 lg:text-[16px] text-[10px] border lg:border-none rounded-xl'>Sale Products</button>
    <button className=' lg:rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 lg:text-[16px] text-[10px] border lg:border-none rounded-xl'>Best Sellers</button>
</div>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {products.map((product, index) => (
        <Card key={index} product={product} index={index}></Card>
        ))}
      </div>
    </div>
  );
}

export default StylishCard;
