

'use client';

import { useParams, useRouter } from 'next/navigation';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '@/utils/api';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// import ProductCard from '@/components/ProductCard';

const ProductDetails = () => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const params = useParams();
  // Fetch product data
  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', params?.slug],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/product/${params?.slug}`);
      return res.json();
    }
  });

  // Fetch related products
  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products', productData?.data?.category],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/product?category=${productData?.data?.category}&limit=5`);
      return res.json();
    },
    enabled: !!productData?.data
  });

  const product = productData?.data;

  // Cart handling
  const handleCartAction = (actionType) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    };

    const existingIndex = cart.findIndex(i => 
      i._id === item._id && 
      i.size === item.size && 
      i.color === item.color
    );

    if(existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    if(actionType === 'buyNow') {
      router.push('/checkout');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton height={500} className="rounded-xl" />
            <div className="flex gap-2">
              {[1,2,3,4].map((_, i) => (
                <Skeleton key={i} height={80} width={80} className="rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <Skeleton width={300} height={40} />
            <Skeleton width={200} height={30} />
            <div className="flex gap-2">
              {[1,2,3].map((_, i) => (
                <Skeleton key={i} width={60} height={40} className="rounded-md" />
              ))}
            </div>
            <Skeleton height={100} />
            <Skeleton width={120} height={50} />
          </div>
        </div>
      </div>
    );
  }

  return (
 <>
 <Navbar></Navbar>
 <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 p-10">
        {/* Image Gallery Section */}
        <div className="space-y-4">
          <Swiper
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="rounded-xl shadow-lg"
          >
            {product?.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={img}
                    alt={`${product.title} - Image ${index + 1}`}
                
                    priority={index === 0}
                    // className="object-contain "
                    // width={300}
                    // height={400}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    quality={80}
                    // priority
                    // sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails Carousel */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs]}
            className="mt-4"
          >
            {product?.images?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-square cursor-pointer border-2 rounded-lg overflow-hidden">
                  <Image
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>
          <div className="text-2xl font-semibold text-primary">
            ${product?.price}
            {product?.discount > 0 && (
              <span className="ml-3 text-lg text-gray-500 line-through">
                ${Math.round(product?.price / (1 - product?.discount/100))}
              </span>
            )}
          </div>

          {/* Size Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product?.sizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedSize === size
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          {product?.colors?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Select Color</h3>
              <div className="flex flex-wrap gap-2">
                {product?.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color 
                        ? 'border-primary ring-2 ring-offset-2 ring-primary'
                        : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleCartAction('add')}
              // disabled={product?.stock === 0 || !selectedSize}
              className={`flex-1 py-3  rounded-lg font-medium ${
                // product?.stock === 0 || !selectedSize
                  // ? 'bg-gray-300 '
                  // : 
                  'bg-orange-600 hover:bg-orange-700 text-white'
              }`}
            >
              {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button
              onClick={() => handleCartAction('buyNow')}
              // disabled={product?.stock === 0 || !selectedSize}
              className={`flex-1 py-3 rounded-lg font-medium ${
                // product?.stock === 0 || !selectedSize
        
                   'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              Buy Now
            </button>
          </div>

          {/* Product Details */}
          <div className="space-y-4 pt-4 border-t">
            <div className="prose max-w-none">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600">{product?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <dt className="font-medium">Category</dt>
                <dd className="text-gray-600">{product?.category?.name}</dd>
              </div>
              <div className="space-y-1">
                <dt className="font-medium">Brand</dt>
                <dd className="text-gray-600">{product?.brand || 'N/A'}</dd>
              </div>
              <div className="space-y-1">
                <dt className="font-medium">Stock</dt>
                <dd className={product?.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product?.stock > 0 ? `${product?.stock} Available` : 'Out of Stock'}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts?.products?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <Swiper
            spaceBetween={24}
            slidesPerView={1.2}
            navigation
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 }
            }}
            modules={[Navigation]}
          >
            {relatedProducts.products.map((product) => (
              <SwiperSlide key={product?._id}>
                <Card
                key={product?._id}
                product={{
                  ...product,
                  name: product?.title,
                  img: product?.images[0],
                  price: product?.price,
                  oldPrice: Math.round(product.price * 1.2),
                  discount: '20% Off'
                }}
                 />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </main>
 <Footer></Footer>
 </>
  );
};

export default ProductDetails;