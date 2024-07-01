import React, { useEffect, useState } from 'react';
import { Card } from 'src/components/ui/card';
import { FaRupeeSign } from 'react-icons/fa';
import { Button } from './ui/button';
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';


const Mycard = ({ product }) => {

  // const linkHandler = () => {
  //   const storedProducts = JSON.parse(localStorage.getItem('clickedProducts')) || [];
  //   const updatedProducts = [...storedProducts, product];
  //   localStorage.setItem('clickedProducts', JSON.stringify(updatedProducts));
  //   console.log('Product Clicked:', product);
  // };

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Check if product is wishlisted on component mount
    const storedProducts = JSON.parse(localStorage.getItem('clickedProducts')) || [];
    const isCurrentlyWishlisted = storedProducts.some((p) => p._id === product._id);
    setIsWishlisted(isCurrentlyWishlisted);
  }, [product._id]);

  const toggleWishlist = () => {
    const storedProducts = JSON.parse(localStorage.getItem('clickedProducts')) || [];
    const index = storedProducts.findIndex((p) => p._id === product._id);

    if (index === -1) {
      // Product not in wishlist, add it
      const updatedProducts = [...storedProducts, product];
      localStorage.setItem('clickedProducts', JSON.stringify(updatedProducts));
      setIsWishlisted(true);
    } else {
      // Product already in wishlist, remove it
      const updatedProducts = storedProducts.filter((p) => p._id !== product._id);
      localStorage.setItem('clickedProducts', JSON.stringify(updatedProducts));
      setIsWishlisted(false);
    }
  };

  return (
    <div className=''>
      <Card className="flex w-full max-w-2xl my-4">
        <div className="w-[33%] overflow-hidden rounded-l-lg flex items-center justify-center max-h-[140px]">
          <img src={product.image_url} alt={product.title} className="object-contain " />
        </div>
        <div className="flex flex-col justify-between w-[67%] p-4">
          <div>
            <h3 className="font-bold line-clamp-2 text-left hover:underline ">
              <a href={product.product_url} target="_blank" rel="noopener noreferrer" >
                {product.title}
              </a>
            </h3>
            <div className='flex flex-row items-center justify-between'>
              <div className="text-gray-500 dark:text-gray-400 flex flex-row my-2">
                Price: <FaRupeeSign className="my-auto" /> {product.price}
              </div>
              <div>
                
              </div>
            </div>
            <div className='flex flex-row items-center justify-between'>
              <Button className='bg-[#ffd814] text-black text-xs p-1 hover:bg-yellow-500' size='xs'>
                <a href={product.product_url} className='flex flex-row' target="_blank" rel="noopener noreferrer">
                Buy Now
                <MdOutlineProductionQuantityLimits className='my-auto ml-2' />

                </a>
              </Button>
              <Button
                  variant='outline'
                  size='icon'
                  onClick={toggleWishlist}
                  className={`h-[32px] w-[32px] mr-2 ${isWishlisted ? 'text-pink-500' : ''}`}
                >
                  {isWishlisted ? <IoMdHeart /> : <FaRegHeart />}
                </Button>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Mycard;
