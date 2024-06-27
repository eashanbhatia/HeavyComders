// ClickedProductsContext.js
import React, { createContext, useState } from 'react';

export const ClickedProductsContext = createContext();

export const ClickedProductsProvider = ({ children }) => {
  const [clickedProducts, setClickedProducts] = useState([]);
  console.log("clickkk:",clickedProducts)

  const addClickedProduct = (product) => {
    setClickedProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, product];
      console.log('Updated Products in Context:', updatedProducts);
      return updatedProducts;
    });
  };
  return (
    <ClickedProductsContext.Provider value={{ clickedProducts, addClickedProduct }}>
      {children}
    </ClickedProductsContext.Provider>
  );
};
