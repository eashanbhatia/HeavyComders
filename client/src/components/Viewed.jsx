import React, { useState, useEffect } from 'react';
import Mycard from './Mycard';

const Viewed = () => {
    const [clickedProducts, setClickedProducts] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('clickedProducts')) || [];
        setClickedProducts(storedProducts);
        console.log('Clicked Products in Viewed Component:', storedProducts);
    }, []);

    return (
        <div className="bg-black py-8 px-4 sm:px-6 lg:px-8 h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-white text-center mb-8">Viewed Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {clickedProducts.map((product, index) => (
                        <div key={product._id} className="">
                            <Mycard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default Viewed;
