import React from 'react';
import { Card } from 'src/components/ui/card';
import { FaRupeeSign } from 'react-icons/fa';

const Mycard = ({ product }) => {

  const linkHandler = () => {
    const storedProducts = JSON.parse(localStorage.getItem('clickedProducts')) || [];
    const updatedProducts = [...storedProducts, product];
    localStorage.setItem('clickedProducts', JSON.stringify(updatedProducts));
    console.log('Product Clicked:', product);
  };

  return (
    <div>
      <Card className="flex w-full max-w-2xl my-4">
        <div className="w-[33%] overflow-hidden rounded-l-lg flex items-center justify-center">
          <img src={product.image_url} alt={product.title} className="object-contain max-h-[112px]" />
        </div>
        <div className="flex flex-col justify-between w-[67%] p-4">
          <div>
            <h3 className="font-bold line-clamp-2 text-left hover:underline">
              <a href={product.product_url} target="_blank" rel="noopener noreferrer" onClick={linkHandler}>
                {product.title}
              </a>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 flex flex-row my-2">
              Price: <FaRupeeSign className="my-auto" /> {product.price}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Mycard;
