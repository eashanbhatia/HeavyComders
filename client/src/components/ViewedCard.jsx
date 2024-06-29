import React from 'react';
import { Card } from 'src/components/ui/card';
import { FaRupeeSign } from 'react-icons/fa';
import { BsAmazon } from "react-icons/bs";
const ViewedCard = ({ product }) => {

    return (
        <div>
            <Card className="flex w-full max-w-2xl my-4 h-[145px]">
                <div className="w-[33%] overflow-hidden rounded-l-lg flex items-center justify-center">
                    <img src={product.image_url} alt={product.title} className="object-contain max-h-[112px]" />
                </div>
                <div className="flex flex-col justify-between w-[67%] p-4">
                    <div>
                        <h3 className="font-bold line-clamp-2 text-left">
                            {product.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 flex flex-row my-2">
                            Price: <FaRupeeSign className="my-auto" /> {product.price}
                        </p>
                        <div className='text-left hover:underline text-gray-600 flex items-center'>
                            <a
                                href={product.product_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                
                                className='flex items-center hover:text-blue-700'
                            >
                                View on Amazon
                                <BsAmazon className='mx-2' />
                            </a>
                        </div>


                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ViewedCard