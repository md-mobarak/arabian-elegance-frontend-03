
// "use client";

// import { useRouter } from 'next/router'
// // import { Swiper, SwiperSlide } from 'swiper/react'
// // import { Navigation, Thumbs, FreeMode } from 'swiper'
// import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// // import dynamic from 'next/dynamic';

// import Skeleton from 'react-loading-skeleton'
// // import ReactImageMagnify from 'react-image-magnify'
// // const ReactImageMagnify = dynamic(() => import('react-image-magnify'), { ssr: false });

// import { useState, useEffect, useRef } from 'react'
// import { useSpring, animated } from '@react-spring/web'
// import { useDrag } from '@use-gesture/react'
// import { useScroll, useMotionValue } from 'framer-motion'
// import Head from 'next/head'
// import { useQuery } from '@tanstack/react-query'
// import { useParams } from 'next/navigation'
// import { baseUrl } from '@/utils/api'
// import Image from 'next/image';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// const AddToCartAnimation = ({ children, onClick }) => {
//   const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
//   const scrollY = useMotionValue(0)
//   const { scrollY: scrollYProgress } = useScroll()

//   const bind = useDrag(({ down, movement: [mx, my] }) => {
//     api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
//     if (!down) {
//       const target = document.querySelector('.cart-icon')
//       if (target) {
//         const { top, left } = target.getBoundingClientRect()
//         const finalX = left - mx - window.scrollX
//         const finalY = top - my - window.scrollY
//         api.start({
//           x: finalX,
//           y: finalY,
//           onRest: () => {
//             onClick()
//             api.set({ x: 0, y: 0 })
//           }
//         })
//       }
//     }
//   })

//   return (
//     <animated.div
//       {...bind()}
//       style={{
//         x,
//         y,
//         touchAction: 'none',
//         position: 'relative',
//         cursor: 'grab'
//       }}
//     >
//       {children}
//     </animated.div>
//   )
// }

// const ProductDetails = () => {
//   const router = useRouter()
//   // const  = router.query
//     const params= useParams()

//   const [selectedSize, setSelectedSize] = useState('')
//   const [thumbsSwiper, setThumbsSwiper] = useState(null)
//   const [cartItems, setCartItems] = useState([])
//   const cartCounter = useRef(null)
//   const [animateCart, setAnimateCart] = useState(false)

//   // Fetch product data
//   const { data, isLoading } = useQuery({
//     queryKey: ['products', params?.slug],
//     queryFn: async () => {
//       const res = await fetch(`${baseUrl}/product/${params?.slug}`)
//       return res.json()
//     }
//   })
  
// const product = data?.data;
// // console.log(product)

//   const { data:relatedProducts } = useQuery({
//     queryKey: ['related', product?.category],
//     queryFn: async () => {
//       if (!product) return;
//       const res = await fetch(`${baseUrl}/product?category=${product.category}&limit=8`);
//       return res.json();
//     },
//     enabled: !!product // Prevents running the query when product is undefined
//   });
//   // const data = relatedProducts.data;
//   console.log(relatedProducts)

//   // Cart handling
//   useEffect(() => {
//     setCartItems(JSON.parse(localStorage.getItem('cart') || '[]'))
//   }, [])

//   const addToCart = (actionType) => {
//     const item = {
//       ...product,
//       size: selectedSize || product.sizes[0],
//       quantity: 1
//     }

//     const existingItemIndex = cartItems.findIndex(
//       cartItem => cartItem._id === item._id && cartItem.size === item.size
//     )

//     let newCart = [...cartItems]
//     if (existingItemIndex > -1) {
//       newCart[existingItemIndex].quantity += 1
//     } else {
//       newCart.push(item)
//     }

//     localStorage.setItem('cart', JSON.stringify(newCart))
//     setCartItems(newCart)
//     setAnimateCart(true)

//     if (actionType === 'buyNow') {
//       router.push('/checkout')
//     }
//   }

//   // Cart animation spring
//   const cartAnimation = useSpring({
//     transform: animateCart ? 'scale(1.2)' : 'scale(1)',
//     config: { tension: 300, friction: 10 },
//     onRest: () => setAnimateCart(false)
//   })

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="space-y-4">
//             <Skeleton height={500} />
//             <div className="flex gap-2">
//               {[1,2,3,4].map(() => <Skeleton height={80} width={80} />)}
//             </div>
//           </div>
//           <div className="space-y-4">
//             <Skeleton width={300} height={40} />
//             <Skeleton width={200} height={30} />
//             <Skeleton width={150} height={25} />
//             <div className="flex gap-2">
//               {[1,2,3].map(() => <Skeleton width={60} height={40} />)}
//             </div>
//             <Skeleton width={120} height={50} />
//             <Skeleton width={200} height={20} count={4} />
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
    
//     <>
//     <Head>{/* মেটা ট্যাগ অপরিবর্তিত */}</Head>
//     {/* navbar  */}
//     <Navbar></Navbar>
//     <div className="container mx-auto px-4 py-8">
//       {/* Main Product Section */}
//       <div className="grid md:grid-cols-2 gap-4 md:gap-8">
//         {/* Image Gallery */}
//         <div className="relative">
//           <Swiper
//             navigation={{
//               prevEl: '.swiper-button-prev',
//               nextEl: '.swiper-button-next',
//             }}
//             thumbs={{ swiper: thumbsSwiper }}
//             modules={[Navigation, Thumbs]}
//             className="mb-2 md:mb-4"
//           >
//             {product.images.map((img, index) => (
//               <SwiperSlide key={index}>
//                 <AddToCartAnimation onClick={() => addToCart('add')}>


//                                   <Image
//                           src={img}
//                           alt={product.title}
//                           fill
//                           sizes="(max-width: 768px) 100vw, 50vw"
//                           className="object-contain bg-gray-50"
//                           priority={index === 0}
//                         />
//                   {/* <ReactImageMagnify
//                     {...{
//                       smallImage: {
//                         alt: product.title,
//                         isFluidWidth: true,
//                         src: img,
//                         sizes: "(max-width: 480px) 100vw, 50vw"
//                       },
//                       largeImage: {
//                         src: img,
//                         width: 1200,
//                         height: 1800
//                       },
//                       enlargedImageContainerStyle: {
//                         zIndex: 50,
//                         backgroundColor: 'white',
//                         left: 'auto',
//                         right: '-50%'
//                       },
//                       isActivatedOnTouch: true
//                     }}
//                   /> */}
//                 </AddToCartAnimation>
//               </SwiperSlide>
//             ))}
//             <div className="swiper-button-prev !text-black md:!text-white" />
//             <div className="swiper-button-next !text-black md:!text-white" />
//           </Swiper>

//           {/* Mobile Thumbnails */}
//           <Swiper
//             onSwiper={setThumbsSwiper}
//             spaceBetween={10}
//             slidesPerView={3}
//             freeMode
//             watchSlidesProgress
//             modules={[FreeMode, Navigation, Thumbs]}
//             className="md:hidden mt-4"
//           >
//             {product.images.map((img, index) => (
//               <SwiperSlide key={index}>
//                 {/* <img 
//                   src={img} 
//                   className="cursor-pointer border-2 border-transparent hover:border-orange-500 object-cover h-16 md:h-24 w-full"
//                   alt="Thumbnail"
//                 /> */}
//                <div className="relative h-24 w-full cursor-pointer">
//   <Image
//     src={img}
//     alt={`Thumbnail ${index + 1}`}
//     fill
//     sizes="(max-width: 768px) 25vw, 10vw"
//     className="object-cover"
//   />
// </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Product Info */}
//         <div className="space-y-4 md:space-y-6">
//           <h1 className="text-2xl md:text-4xl font-bold text-gray-900">{product.title}</h1>
//           <p className="text-2xl md:text-3xl text-orange-600">${product.price}</p>
          
//           <div className="border-t border-b border-gray-200 py-3 md:py-4">
//             <p className="text-sm md:text-base text-gray-600 leading-relaxed">
//               {product.description}
//             </p>
//           </div>

//           {/* Size Selection */}
//           <div>
//             <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3">Select Size</h3>
//             <div className="flex flex-wrap gap-2 md:gap-3">
//               {product.sizes.map(size => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`px-3 py-1 md:px-6 md:py-2 border-2 rounded-md text-sm md:text-base ${
//                     selectedSize === size 
//                       ? 'border-orange-600 bg-orange-100 text-orange-700'
//                       : 'border-gray-200 hover:border-orange-400'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col md:flex-row gap-2 md:gap-4">
//             <button
//               onClick={() => addToCart('add')}
//               className="w-full md:flex-1 bg-orange-600 text-white py-2 md:py-3 rounded-lg hover:bg-orange-700 transition-colors text-sm md:text-base"
//             >
//               Add to Cart
//             </button>
//             <button
//               onClick={() => addToCart('buyNow')}
//               className="w-full md:flex-1 bg-black text-white py-2 md:py-3 rounded-lg hover:bg-gray-800 transition-colors text-sm md:text-base"
//             >
//               Buy Now
//             </button>
//           </div>

//           {/* Cart Animation */}
//           {/* <div className='relative'>
//           <animated.div
//             style={cartAnimation}
//             className="cart-icon fixed top-4 right-2 md:top-4 md:right-4 bg-orange-600 text-white p-2 md:p-3 rounded-full shadow-lg text-sm md:text-base"
//           >
//             🛒 {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
//           </animated.div>
//           </div> */}

//           {/* Product Details */}
//           <div className="space-y-1 md:space-y-2 text-gray-600 text-sm md:text-base">
//             <p><span className="font-medium">Category:</span> {product.category}</p>
//             <p><span className="font-medium">Brand:</span> {product.brand}</p>
//             <p><span className="font-medium">Stock:</span> {product.stock} available</p>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className="mt-8 md:mt-16">
//         <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 px-2 md:px-0">Related Products</h2>
//         <Swiper
//           spaceBetween={15}
//           slidesPerView={1}
//           breakpoints={{
//             320: { slidesPerView: 1.5 },
//             480: { slidesPerView: 2 },
//             640: { slidesPerView: 3 },
//             1024: { slidesPerView: 4 }
//           }}
//           navigation
//           modules={[Navigation]}
//           className="px-2 md:px-0"
//         >
//           {relatedProducts?.products?.map((product,index) => (
//             <SwiperSlide key={product._id} className="pb-4">
//               <div className="group relative border rounded-lg overflow-hidden mx-1">
//               <div className="relative h-48 md:h-64 w-full">
//                 <Image
//                   src={product.images[0]}
//                   alt={product.title}
//                   fill
//                   sizes="(max-width: 768px) 50vw, 25vw"
//                   className="object-cover"
//                   priority={index < 2} // প্রথম ২টি ইমেজ প্রায়োরিটি লোড
//                 />
//               </div>
//                 <div className="p-2 md:p-4">
//                   <h3 className="font-medium truncate text-sm md:text-base">{product.title}</h3>
//                   <p className="text-orange-600 text-sm md:text-base">${product.price}</p>
//                 </div>
//                 <button 
//                   className="absolute top-1 right-1 md:top-2 md:right-2 bg-white p-1 md:p-2 rounded-full shadow-lg hover:bg-orange-100"
//                   onClick={() => addToCart('add')}
//                 >
//                   <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                   </svg>
//                 </button>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//     <Footer></Footer>
//   </>
//   )
// }

// export default ProductDetails

// // // "use client";

// // // import { useRouter } from 'next/router';
// // // import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
// // // import { Swiper, SwiperSlide } from 'swiper/react';
// // // import 'swiper/css';
// // // import 'swiper/css/navigation';
// // // import 'swiper/css/pagination';
// // // import 'swiper/css/thumbs';
// // // import Zoom from 'react-medium-image-zoom';
// // // import Skeleton from 'react-loading-skeleton';
// // // import { useState, useEffect, useRef } from 'react';
// // // import { useSpring, animated } from '@react-spring/web';
// // // import Head from 'next/head';
// // // import { useQuery } from '@tanstack/react-query';
// // // import { useParams } from 'next/navigation';
// // // import { baseUrl } from '@/utils/api';
// // // import Image from 'next/image';
// // // import Navbar from '@/components/Navbar';
// // // import Footer from '@/components/Footer';

// // // const AddToCartAnimation = ({ children, onClick }) => {
// // //   const [isActive, setIsActive] = useState(false);
// // //   const styles = useSpring({
// // //     transform: isActive ? 'scale(0.95)' : 'scale(1)',
// // //     config: { tension: 300, friction: 10 }
// // //   });

// // //   return (
// // //     <animated.div
// // //       style={styles}
// // //       onClick={() => {
// // //         setIsActive(true);
// // //         setTimeout(() => setIsActive(false), 200);
// // //         onClick();
// // //       }}
// // //       className="cursor-pointer"
// // //     >
// // //       {children}
// // //     </animated.div>
// // //   );
// // // };

// // // const ProductDetails = () => {
// // //   const router = useRouter();
// // //   const params = useParams();
// // //   const [selectedSize, setSelectedSize] = useState('');
// // //   const [thumbsSwiper, setThumbsSwiper] = useState(null);
// // //   const [cartItems, setCartItems] = useState([]);
// // //   const [animateCart, setAnimateCart] = useState(false);

// // //   // Fetch product data
// // //   const { data, isLoading } = useQuery({
// // //     queryKey: ['products', params?.slug],
// // //     queryFn: async () => {
// // //       const res = await fetch(`${baseUrl}/product/${params?.slug}`);
// // //       return res.json();
// // //     }
// // //   });

// // //   const product = data?.data;

// // //   const { data: relatedProducts } = useQuery({
// // //     queryKey: ['related', product?.category],
// // //     queryFn: async () => {
// // //       if (!product) return;
// // //       const res = await fetch(`${baseUrl}/product?category=${product.category}&limit=8`);
// // //       return res.json();
// // //     },
// // //     enabled: !!product
// // //   });

// // //   // Cart handling
// // //   useEffect(() => {
// // //     setCartItems(JSON.parse(localStorage.getItem('cart') || '[]'));
// // //   }, []);

// // //   const addToCart = (actionType) => {
// // //     const item = {
// // //       ...product,
// // //       size: selectedSize || product.sizes[0],
// // //       quantity: 1
// // //     };

// // //     const existingItemIndex = cartItems.findIndex(
// // //       cartItem => cartItem._id === item._id && cartItem.size === item.size
// // //     );

// // //     let newCart = [...cartItems];
// // //     if (existingItemIndex > -1) {
// // //       newCart[existingItemIndex].quantity += 1;
// // //     } else {
// // //       newCart.push(item);
// // //     }

// // //     localStorage.setItem('cart', JSON.stringify(newCart));
// // //     setCartItems(newCart);
// // //     setAnimateCart(true);

// // //     if (actionType === 'buyNow') {
// // //       router.push('/checkout');
// // //     }
// // //   };

// // //   const cartAnimation = useSpring({
// // //     transform: animateCart ? 'scale(1.2)' : 'scale(1)',
// // //     config: { tension: 300, friction: 10 },
// // //     onRest: () => setAnimateCart(false)
// // //   });

// // //   if (isLoading) {
// // //     return (
// // //       <div className="container mx-auto px-4 py-8">
// // //         <div className="grid md:grid-cols-2 gap-8">
// // //           <div className="space-y-4">
// // //             <Skeleton height={500} />
// // //             <div className="flex gap-2">
// // //               {[1,2,3,4].map((_, i) => <Skeleton key={i} height={80} width={80} />)}
// // //             </div>
// // //           </div>
// // //           <div className="space-y-4">
// // //             <Skeleton width={300} height={40} />
// // //             <Skeleton width={200} height={30} />
// // //             <Skeleton width={150} height={25} />
// // //             <div className="flex gap-2">
// // //               {[1,2,3].map((_, i) => <Skeleton key={i} width={60} height={40} />)}
// // //             </div>
// // //             <Skeleton width={120} height={50} />
// // //             <Skeleton width={200} height={20} count={4} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <>
// // //       <Head>
// // //         <title>{product.title} - Arabian Elegance</title>
// // //         <meta name="description" content={product.description} />
// // //       </Head>
// // //       <Navbar />
      
// // //       <main className="container mx-auto px-4 py-8">
// // //         <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
// // //           {/* Image Gallery */}
// // //           <div className="space-y-4">
// // //             <Swiper
// // //               navigation={{
// // //                 prevEl: '.swiper-button-prev',
// // //                 nextEl: '.swiper-button-next',
// // //               }}
// // //               thumbs={{ swiper: thumbsSwiper }}
// // //               modules={[Navigation, Thumbs]}
// // //               className="main-swiper rounded-lg overflow-hidden"
// // //             >
// // //               {product.images.map((img, index) => (
// // //                 <SwiperSlide key={index}>
// // //                   <AddToCartAnimation onClick={() => addToCart('add')}>
// // //                     <div className="relative h-[500px] w-full">
// // //                       {/* <Zoom zoomMargin={40}> */}
// // //                         <Image
// // //                           src={img}
// // //                           alt={product.title}
// // //                           fill
// // //                           sizes="(max-width: 768px) 100vw, 50vw"
// // //                           className="object-contain bg-gray-50"
// // //                           priority={index === 0}
// // //                         />
// // //                       {/* </Zoom> */}
// // //                     </div>
// // //                   </AddToCartAnimation>
// // //                 </SwiperSlide>
// // //               ))}
// // //               <div className="swiper-button-prev !text-black md:!text-white" />
// // //               <div className="swiper-button-next !text-black md:!text-white" />
// // //             </Swiper>

// // //             {/* Thumbnails */}
// // //             <Swiper
// // //               onSwiper={setThumbsSwiper}
// // //               spaceBetween={10}
// // //               slidesPerView={3}
// // //               freeMode
// // //               watchSlidesProgress
// // //               modules={[FreeMode, Navigation, Thumbs]}
// // //               className="mt-4"
// // //             >
// // //               {product.images.map((img, index) => (
// // //                 <SwiperSlide key={index}>
// // //                   <div className="relative h-24 w-full cursor-pointer border-2 border-transparent hover:border-orange-300 transition-colors rounded-lg overflow-hidden">
// // //                     <Image
// // //                       src={img}
// // //                       alt={`Thumbnail ${index + 1}`}
// // //                       fill
// // //                       sizes="100px"
// // //                       className="object-cover"
// // //                     />
// // //                   </div>
// // //                 </SwiperSlide>
// // //               ))}
// // //             </Swiper>
// // //           </div>

// // //           {/* Product Info */}
// // //           <div className="space-y-6">
// // //             <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.title}</h1>
// // //             <p className="text-2xl text-orange-600 font-medium">${product.price}</p>
            
// // //             <div className="prose max-w-none text-gray-600">
// // //               <p className="text-lg">{product.description}</p>
// // //             </div>

// // //             {/* Size Selection */}
// // //             <div className="space-y-3">
// // //               <h3 className="text-lg font-semibold">Select Size</h3>
// // //               <div className="flex flex-wrap gap-2">
// // //                 {product.sizes.map(size => (
// // //                   <button
// // //                     key={size}
// // //                     onClick={() => setSelectedSize(size)}
// // //                     className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
// // //                       selectedSize === size
// // //                         ? 'bg-orange-600 text-white'
// // //                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
// // //                     }`}
// // //                   >
// // //                     {size}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             {/* Action Buttons */}
// // //             <div className="flex flex-col sm:flex-row gap-3">
// // //               <button
// // //                 onClick={() => addToCart('add')}
// // //                 className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
// // //               >
// // //                 Add to Cart
// // //               </button>
// // //               <button
// // //                 onClick={() => addToCart('buyNow')}
// // //                 className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
// // //               >
// // //                 Buy Now
// // //               </button>
// // //             </div>

// // //             {/* Product Details */}
// // //             <dl className="grid grid-cols-2 gap-4 text-gray-600">
// // //               <div className="border-t pt-4">
// // //                 <dt className="font-medium">Category</dt>
// // //                 <dd>{product.category}</dd>
// // //               </div>
// // //               <div className="border-t pt-4">
// // //                 <dt className="font-medium">Stock</dt>
// // //                 <dd>{product.stock} available</dd>
// // //               </div>
// // //             </dl>
// // //           </div>
// // //         </div>

// // //         {/* Related Products */}
// // //         <section className="mt-16">
// // //           <h2 className="text-2xl font-bold mb-8">Related Products</h2>
// // //           <Swiper
// // //             spaceBetween={24}
// // //             slidesPerView={1.2}
// // //             breakpoints={{
// // //               640: { slidesPerView: 2.5 },
// // //               1024: { slidesPerView: 4 }
// // //             }}
// // //             navigation
// // //             modules={[Navigation]}
// // //           >
// // //             {relatedProducts?.products?.map((product, index) => (
// // //               <SwiperSlide key={product._id}>
// // //                 <div className="group relative border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
// // //                   <div className="relative h-64 bg-gray-50">
// // //                     <Image
// // //                       src={product.images[0]}
// // //                       alt={product.title}
// // //                       fill
// // //                       sizes="(max-width: 768px) 50vw, 25vw"
// // //                       className="object-contain"
// // //                       priority={index < 2}
// // //                     />
// // //                     <button 
// // //                       className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-orange-100 transition-colors"
// // //                       onClick={() => addToCart('add')}
// // //                     >
// // //                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// // //                       </svg>
// // //                     </button>
// // //                   </div>
// // //                   <div className="p-4">
// // //                     <h3 className="font-medium truncate">{product.title}</h3>
// // //                     <p className="text-orange-600 font-medium mt-1">${product.price}</p>
// // //                   </div>
// // //                 </div>
// // //               </SwiperSlide>
// // //             ))}
// // //           </Swiper>
// // //         </section>
// // //       </main>

// // //       <Footer />
// // //     </>
// // //   );
// // // };

// // // export default ProductDetails;
"use client";

import { useRouter } from 'next/router';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Skeleton from 'react-loading-skeleton';
import { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { baseUrl } from '@/utils/api';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AddToCartAnimation = ({ children, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const styles = useSpring({
    transform: isActive ? 'scale(0.95)' : 'scale(1)',
    config: { tension: 300, friction: 10 }
  });

  return (
    <animated.div
      style={styles}
      onClick={() => {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 200);
        onClick();
      }}
      className="cursor-pointer hover:shadow-lg transition-shadow"
    >
      {children}
    </animated.div>
  );
};

const ProductDetails = () => {
  const router = useRouter();
  const params = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [animateCart, setAnimateCart] = useState(false);

  // Fetch product data
  const { data, isLoading } = useQuery({
    queryKey: ['products', params?.slug],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/product/${params?.slug}`);
      return res.json();
    }
  });

  const product = data?.data;

  const { data: relatedProducts } = useQuery({
    queryKey: ['related', product?.category],
    queryFn: async () => {
      if (!product) return;
      const res = await fetch(`${baseUrl}/product?category=${product.category}&limit=8`);
      return res.json();
    },
    enabled: !!product
  });

  // Cart handling
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const addToCart = (actionType) => {
    const item = {
      ...product,
      size: selectedSize || product.sizes[0],
      quantity: 1
    };

    const existingItemIndex = cartItems.findIndex(
      cartItem => cartItem._id === item._id && cartItem.size === item.size
    );

    let newCart = [...cartItems];
    if (existingItemIndex > -1) {
      newCart[existingItemIndex].quantity += 1;
    } else {
      newCart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
    setAnimateCart(true);

    if (actionType === 'buyNow') {
      router.push('/checkout');
    }
  };

  const cartAnimation = useSpring({
    transform: animateCart ? 'scale(1.2)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
    onRest: () => setAnimateCart(false)
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton height={500} />
            <div className="flex gap-2">
              {[1,2,3,4].map((_, i) => <Skeleton key={i} height={80} width={80} />)}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton width={300} height={40} />
            <Skeleton width={200} height={30} />
            <Skeleton width={150} height={25} />
            <div className="flex gap-2">
              {[1,2,3].map((_, i) => <Skeleton key={i} width={60} height={40} />)}
            </div>
            <Skeleton width={120} height={50} />
            <Skeleton width={200} height={20} count={4} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.title} - Arabian Elegance</title>
        <meta name="description" content={product.description} />
      </Head>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Swiper
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="main-swiper rounded-lg overflow-hidden shadow-lg"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <AddToCartAnimation onClick={() => addToCart('add')}>
                    <div className="relative h-[500px] w-full bg-gray-50">
                      <TransformWrapper
                        initialScale={1}
                        minScale={1}
                        maxScale={8}
                        wheel={{ step: 0.1 }}
                        pinch={{ step: 10 }}
                      >
                        {({ zoomIn, zoomOut, resetTransform }) => (
                          <>
                            <div className="absolute top-4 right-4 z-10 flex gap-2 bg-white/90 p-2 rounded-lg shadow-md">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  zoomIn();
                                }}
                                className="px-3 py-1 hover:bg-gray-100 rounded-md transition-colors"
                              >
                                +
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  zoomOut();
                                }}
                                className="px-3 py-1 hover:bg-gray-100 rounded-md transition-colors"
                              >
                                -
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resetTransform();
                                }}
                                className="px-3 py-1 hover:bg-gray-100 rounded-md transition-colors"
                              >
                                ↻
                              </button>
                            </div>
                            <TransformComponent>
                              <Image
                                src={img}
                                alt={product.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-contain"
                                priority={index === 0}
                              />
                            </TransformComponent>
                          </>
                        )}
                      </TransformWrapper>
                    </div>
                  </AddToCartAnimation>
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev !text-black md:!text-white" />
              <div className="swiper-button-next !text-black md:!text-white" />
            </Swiper>

            {/* Thumbnails */}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Navigation, Thumbs]}
              className="mt-4 px-2"
              breakpoints={{
                640: { slidesPerView: 5 },
                1024: { slidesPerView: 6 }
              }}
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative h-24 w-full cursor-pointer border-2 border-transparent hover:border-orange-300 transition-colors rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-2xl text-orange-600 font-medium">${product.price}</p>
            
            <div className="prose max-w-none text-gray-600 border-y py-6">
              <p className="text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Select Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart('add')}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToCart('buyNow')}
                className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <dl className="grid grid-cols-2 gap-4 text-gray-600">
              <div className="border-t pt-4">
                <dt className="font-medium">Category</dt>
                <dd className="truncate">{product.category}</dd>
              </div>
              <div className="border-t pt-4">
                <dt className="font-medium">Stock</dt>
                <dd>{product.stock} available</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8 px-4">You Might Also Like</h2>
          <Swiper
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 }
            }}
            navigation
            modules={[Navigation]}
            className="px-4"
          >
            {relatedProducts?.products?.map((product, index) => (
              <SwiperSlide key={product._id}>
                <div className="group relative border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white">
                  <div className="relative h-64 bg-gray-50">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain"
                      priority={index < 2}
                    />
                    <button 
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm hover:bg-orange-100 transition-colors"
                      onClick={() => addToCart('add')}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">{product.title}</h3>
                    <p className="text-orange-600 font-medium mt-1">${product.price}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;