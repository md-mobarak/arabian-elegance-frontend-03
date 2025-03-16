
// 'use client';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { baseUrl } from '@/utils/api';
// import { useMutation } from '@tanstack/react-query';


// export default function CheckoutPage() { 
//   const [cartItems, setCartItems] = useState([]);
//   const [total, setTotal] = useState(0);
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   // Fetch cart items from localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       const items = JSON.parse(savedCart);
//       setCartItems(items);
//       calculateTotal(items);
//     }
//   }, []);

//   const calculateTotal = (items) => {
//     const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     setTotal(subtotal + 120);
//   };

//   // React Query Mutation
//   const { mutate, isPending } = useMutation({
//     mutationFn: (orderData) => 
//       axios.post(`${baseUrl}/order`, orderData).then(res => res.data),
//     onSuccess: (data) => {
//       localStorage.removeItem('cart');
//       router.push(`/orderDetails/${data._id}`);
//       toast.success('অর্ডার সফল হয়েছে!');
//     },
//     onError: (error) => {
//       toast.error('অর্ডার ব্যর্থ হয়েছে!');
//       console.error('Order Error:', error);
//     }
//   });

//   const onSubmit = (formData) => {
//     const orderData = {
//       ...formData,
//       products: cartItems.map(item => ({
//         product: item._id,
//         quantity: item.quantity,
//         price: item.price
//       })),
//       totalAmount: total,
//       status: 'pending',
//       paymentStatus: 'unpaid'
//     };

//     mutate(orderData);
//   };


//   return (

// <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
//     <Navbar />
    
//     <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
//       <div className="grid md:grid-cols-3 gap-8">
//         {/* Billing Form */}
//         <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-orange-100">
//           <h2 className="text-3xl font-bold mb-8 text-orange-800">বিলিং ও শিপিং বিবরণ</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
//               {[
//                 { label: 'পূর্ণ নাম *', name: 'name', type: 'text' },
//                 { label: 'ইমেইল', name: 'email', type: 'email' },
//                 { label: 'ফোন নম্বর *', name: 'phone', type: 'tel' },
//                 { label: 'জেলা *', name: 'district', type: 'text' },
//                 { label: 'থানা *', name: 'thana', type: 'text' },
//                 { label: 'গ্রাম *', name: 'village', type: 'text' },
//               ].map((field) => (
//                 <div key={field.name} className="w-full">
//                   <label className="block text-sm font-semibold mb-2 text-gray-700">
//                     {field.label}
//                     <input
//                       {...register(field.name, { required: field.label.includes('*') })}
//                       type={field.type}
//                       className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 border-orange-200 focus:ring-orange-200"
//                     />
//                   </label>
//                   {errors[field.name] && (
//                     <span className="text-red-600 text-sm flex items-center mt-1">
//                       <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                       এই ফিল্ডটি প্রয়োজনীয়
//                     </span>
//                   )}
//                 </div>
//               ))}

//               <div className="col-span-2">
//                 <label className="block text-sm font-semibold mb-2 text-gray-700">
//                   রাস্তার ঠিকানা *
//                   <input
//                     {...register('streetAddress', { required: true })}
//                     className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200"
//                   />
//                 </label>
//               </div>

//               <div className="col-span-2">
//                 <label className="block text-sm font-semibold mb-2 text-gray-700">
//                   অতিরিক্ত তথ্য
//                   <textarea
//                     {...register('additionalInformation')}
//                     className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200"
//                     rows="3"
//                     placeholder="বিশেষ নির্দেশনা বা নোট..."
//                   />
//                 </label>
//               </div>
//             </div>

//             <div className="mt-8">
//               <label className="flex items-start">
//                 <input
//                   type="checkbox"
//                   {...register('terms', { required: true })}
//                   className="mt-1 h-5 w-5 text-orange-600 border-2 border-orange-300 rounded focus:ring-orange-200"
//                 />
//                 <span className="ml-3 text-sm text-gray-700">
//                   আমি ওয়েবসাইটের{' '}
//                   <a href="/terms" className="text-orange-600 hover:underline">
//                     শর্তাবলী
//                   </a> পড়ে সম্মত হয়েছি
//                 </span>
//               </label>
//               {errors.terms && (
//                 <p className="text-red-600 text-sm mt-2 flex items-center">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   আপনাকে শর্তাবলী গ্রহণ করতে হবে
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.01] shadow-lg"
//             >
//               অর্ডার সম্পন্ন করুন
//             </button>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-orange-50 p-6 rounded-xl shadow-lg border border-orange-100 h-fit">
//           <h2 className="text-3xl font-bold mb-6 text-orange-800">অর্ডার সারসংক্ষেপ</h2>
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg">
//                 <div>
//                   <h3 className="font-semibold text-gray-800">{item.name}</h3>
//                   <p className="text-sm text-gray-500">পরিমাণ: {item.quantity}</p>
//                 </div>
//                 <div className="font-medium text-orange-700">৳{(item.price * item.quantity).toLocaleString()}</div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 pt-6 border-t border-orange-200">
//             <div className="space-y-3">
//               <div className="flex justify-between text-gray-700">
//                 <span>সাবটোটাল</span>
//                 <span>৳{(total - 120).toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-gray-700">
//                 <span>শিপিং</span>
//                 <span>৳120</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg pt-3">
//                 <span className="text-orange-800">মোট</span>
//                 <span className="text-orange-800">৳{total.toLocaleString()}</span>
//               </div>
//             </div>
//           </div>

//           <div className="mt-6 p-4 bg-orange-100 rounded-lg">
//             <p className="text-sm text-orange-800 flex items-center">
//               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               ক্যাশ অন ডেলিভারি
//             </p>
//           </div>
//         </div>
//       </div>
//     </main>

//     <Footer />
//   </div>

//   //   <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
//   //   <Navbar />
    
//   //   <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
//   //     <div className="grid md:grid-cols-3 gap-8">
//   //       {/* Billing Form */}
//   //       <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-orange-100">
//   //         <h2 className="text-3xl font-bold mb-8 text-orange-800">Billing & Shipping Details</h2>
//   //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//   //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//   //             {[
//   //               { label: 'Full Name *', name: 'name', type: 'text' },
//   //               { label: 'Email', name: 'email', type: 'email' },
//   //               { label: 'Phone Number *', name: 'phone', type: 'tel' },
//   //               { label: 'District *', name: 'district', type: 'text' },
//   //               { label: 'Thana *', name: 'thana', type: 'text' },
//   //               { label: 'Village *', name: 'village', type: 'text' },
//   //             ].map((field) => (
//   //               <div key={field.name}>
//   //                 <label className="block  text-sm font-semibold mb-2 text-gray-700">
//   //                   {field.label}
//   //                   <input
//   //                     {...register(field.name, { required: field.label.includes('*') })}
//   //                     type={field.type}
//   //                     className={`lg:w-full px-4 py-3 border-2 rounded-lg focus:ring-2 ${
//   //                       errors[field.name] ? 'border-red-500 focus:ring-red-200' : 'border-orange-200 focus:ring-orange-200'
//   //                     }`}
//   //                   />
//   //                 </label>
//   //                 {errors[field.name] && (
//   //                   <span className="text-red-600 text-sm flex items-center mt-1">
//   //                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//   //                       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//   //                     </svg>
//   //                     Required field
//   //                   </span>
//   //                 )}
//   //               </div>
//   //             ))}

//   //             <div className="col-span-2">
//   //               <label className="block text-sm font-semibold mb-2 text-gray-700">
//   //                 Street Address *
//   //                 <input
//   //                   {...register('streetAddress', { required: true })}
//   //                   className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200"
//   //                 />
//   //               </label>
//   //             </div>

//   //             <div className="col-span-2">
//   //               <label className="block text-sm font-semibold mb-2 text-gray-700">
//   //                 Additional Information
//   //                 <textarea
//   //                   {...register('additionalInformation')}
//   //                   className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200"
//   //                   rows="3"
//   //                   placeholder="Special instructions or notes..."
//   //                 />
//   //               </label>
//   //             </div>
//   //           </div>

//   //           <div className="mt-8">
//   //             <label className="flex items-start">
//   //               <input
//   //                 type="checkbox"
//   //                 {...register('terms', { required: true })}
//   //                 className="mt-1 h-5 w-5 text-orange-600 border-2 border-orange-300 rounded focus:ring-orange-200"
//   //               />
//   //               <span className="ml-3 text-sm text-gray-700">
//   //                 I have read and agree to the website{' '}
//   //                 <a href="/terms" className="text-orange-600 hover:underline">
//   //                   terms and conditions
//   //                 </a>
//   //               </span>
//   //             </label>
//   //             {errors.terms && (
//   //               <p className="text-red-600 text-sm mt-2 flex items-center">
//   //                 <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//   //                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//   //                 </svg>
//   //                 You must accept terms
//   //               </p>
//   //             )}
//   //           </div>

//   //           <button
//   //             type="submit"
//   //             className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.01] shadow-lg"
//   //           >
//   //             PLACE ORDER
//   //           </button>
//   //         </form>
//   //       </div>

//   //       {/* Order Summary */}
//   //       <div className="bg-orange-50 p-6 rounded-xl shadow-lg border border-orange-100 h-fit">
//   //         <h2 className="text-3xl font-bold mb-6 text-orange-800">Order Summary</h2>
//   //         <div className="space-y-4">
//   //           {cartItems.map((item) => (
//   //             <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg">
//   //               <div>
//   //                 <h3 className="font-semibold text-gray-800">{item.name}</h3>
//   //                 <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//   //               </div>
//   //               <div className="font-medium text-orange-700">৳{(item.price * item.quantity).toLocaleString()}</div>
//   //             </div>
//   //           ))}
//   //         </div>

//   //         <div className="mt-8 pt-6 border-t border-orange-200">
//   //           <div className="space-y-3">
//   //             <div className="flex justify-between text-gray-700">
//   //               <span>Subtotal</span>
//   //               <span>৳{(total - 120).toLocaleString()}</span>
//   //             </div>
//   //             <div className="flex justify-between text-gray-700">
//   //               <span>Shipping</span>
//   //               <span>৳120</span>
//   //             </div>
//   //             <div className="flex justify-between font-bold text-lg pt-3">
//   //               <span className="text-orange-800">Total</span>
//   //               <span className="text-orange-800">৳{total.toLocaleString()}</span>
//   //             </div>
//   //           </div>
//   //         </div>

//   //         <div className="mt-6 p-4 bg-orange-100 rounded-lg">
//   //           <p className="text-sm text-orange-800 flex items-center">
//   //             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//   //               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//   //             </svg>
//   //             Cash on Delivery Available
//   //           </p>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </main>

//   //   <Footer />
//   // </div>

// // {/* <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
// //   <Navbar />
  
// //   <main className="flex-grow max-w-7xl mx-auto px-2 sm:px-4 py-6 w-full">
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      
  
// //       <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-orange-100 order-2 lg:order-1">
// //         <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-orange-800">Billing & Shipping Details</h2>
// //         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
// //             {[ 
// //               { label: 'Full Name *', name: 'name', type: 'text' },
// //               { label: 'Email', name: 'email', type: 'email' },
// //               { label: 'Phone Number *', name: 'phone', type: 'tel' },
// //               { label: 'District *', name: 'district', type: 'text' },
// //               { label: 'Thana *', name: 'thana', type: 'text' },
// //               { label: 'Village *', name: 'village', type: 'text' },
// //             ].map((field) => (
// //               <div key={field.name} className="w-full">
// //                 <label className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-700">
// //                   {field.label}
// //                   <input
// //                     {...register(field.name, { required: field.label.includes('*') })}
// //                     type={field.type}
// //                     className={`w-full px-3 sm:px-4 py-2 sm:py-3 border-2 rounded-lg focus:ring-2 text-sm sm:text-base ${errors[field.name] ? 'border-red-500 focus:ring-red-200' : 'border-orange-200 focus:ring-orange-200'}`}
// //                   />
// //                 </label>
// //               </div>
// //             ))}
            
// //             <div className="col-span-2">
// //               <label className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-700">
// //                 Street Address *
// //                 <input
// //                   {...register('streetAddress', { required: true })}
// //                   className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200 text-sm sm:text-base"
// //                 />
// //               </label>
// //             </div>

// //             <div className="col-span-2">
// //               <label className="block text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-gray-700">
// //                 Additional Information
// //                 <textarea
// //                   {...register('additionalInformation')}
// //                   className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200 text-sm sm:text-base"
// //                   rows="3"
// //                   placeholder="Special instructions or notes..."
// //                 />
// //               </label>
// //             </div>
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.01] shadow-lg text-sm sm:text-base"
// //           >
// //             PLACE ORDER
// //           </button>
// //         </form>
// //       </div>

    
// //       <div className="bg-orange-50 p-4 sm:p-6 rounded-xl shadow-lg border border-orange-100 h-fit order-1 lg:order-2 mb-6 lg:mb-0">
// //         <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-orange-800">Order Summary</h2>
// //         <div className="space-y-3 sm:space-y-4">
// //           {cartItems.map((item) => (
// //             <div key={item.id} className="flex justify-between items-center bg-white p-3 sm:p-4 rounded-lg">
// //               <div>
// //                 <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h3>
// //                 <p className="text-xs sm:text-sm text-gray-500">Quantity: {item.quantity}</p>
// //               </div>
// //               <div className="font-medium text-orange-700 text-sm sm:text-base">
// //                 ৳{(item.price * item.quantity).toLocaleString()}
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-orange-200">
// //           <div className="space-y-2 sm:space-y-3">
// //             <div className="flex justify-between text-gray-700 text-sm sm:text-base">
// //               <span>Subtotal</span>
// //               <span>৳{(total - 120).toLocaleString()}</span>
// //             </div>
// //             <div className="flex justify-between text-gray-700 text-sm sm:text-base">
// //               <span>Shipping</span>
// //               <span>৳120</span>
// //             </div>
// //             <div className="flex justify-between font-bold text-base sm:text-lg pt-2 sm:pt-3">
// //               <span className="text-orange-800">Total</span>
// //               <span className="text-orange-800">৳{total.toLocaleString()}</span>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange-100 rounded-lg">
// //           <p className="text-xs sm:text-sm text-orange-800 flex items-center">
// //             <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
// //               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //             </svg>
// //             Cash on Delivery Available
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   </main>

// //   <Footer />
// // </div> */}

//   );
// }



'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { baseUrl } from '@/utils/api';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Load cart items and calculate total
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      calculateTotal(items);
    }
  }, []);
 console.log(cartItems)
  const calculateTotal = (items) => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(subtotal + 120); // Shipping cost
  };

  // React Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (orderData) => 
      axios.post(`${baseUrl}/api/v1/orders`, orderData),
    onSuccess: (data) => {
      localStorage.removeItem('cart');
      router.push(`/orders/${data.data._id}`);
      toast.success('Order placed successfully!');
    },
    onError: (error) => {
      toast.error('Order failed!');
      console.error('Error details:', error.response?.data || error.message);
    }
  });

  const onSubmit = (formData) => {
    const orderData = {
      ...formData,
      product: cartItems.map(item => ({
        product: item._id, // Must match product ID from backend
        quantity: quantity,
        price: item.price
      })),
      totalAmount: total,
      paymentStatus: 'unpaid',
      status: 'pending'
    };
console.log(orderData)
    // mutate(orderData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Billing Form */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-orange-100">
            <h2 className="text-3xl font-bold mb-8 text-orange-800">Billing Details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: 'Full Name *', name: 'name', type: 'text' },
                  { label: 'Email', name: 'email', type: 'email' },
                  { label: 'Phone *', name: 'phone', type: 'tel' },
                  { label: 'District *', name: 'district', type: 'text' },
                  { label: 'Thana *', name: 'thana', type: 'text' },
                  { label: 'Village *', name: 'village', type: 'text' },
                ].map((field) => (
                  <div key={field.name} className="w-full">
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      {field.label}
                      <input
                        {...register(field.name, { 
                          required: field.label.includes('*') 
                        })}
                        type={field.type}
                        className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 border-orange-200 focus:ring-orange-200"
                      />
                    </label>
                    {errors[field.name] && (
                      <span className="text-red-600 text-sm mt-1">
                        This field is required
                      </span>
                    )}
                  </div>
                ))}

                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Street Address *
                    <input
                      {...register('streetAddress', { required: true })}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200"
                    />
                  </label>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Additional Notes
                    <textarea
                      {...register('additionalInformation')}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-200"
                      rows="3"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {isPending ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-orange-50 p-6 rounded-xl shadow-lg border border-orange-100 h-fit">
            <h2 className="text-3xl font-bold mb-6 text-orange-800">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center bg-white p-4 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium text-orange-700">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-orange-200">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>৳{(total - 120).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>৳120</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3">
                  <span className="text-orange-800">Total</span>
                  <span className="text-orange-800">৳{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}