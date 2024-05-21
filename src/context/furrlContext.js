import React, { createContext, useState,useContext } from 'react';

export const FurrlContext = createContext();

export const FurrlProvider = ({ children }) => {
  const [product, setProduct] = useState([]);

  const onChange = (data) => {
    //console.log(data);
    setProduct(data);
  };

  return (
    <FurrlContext.Provider value={{ product, onChange }}>
      {children}
    </FurrlContext.Provider>
  );
};

export const useProduct = () => useContext(FurrlContext);