import React, { useContext, useEffect, useState } from 'react';

import { calcTotalItems, calcShipping } from '../../utils/functions';

const CartContext = React.createContext();

export const CartContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storageItems = localStorage.getItem('@cart_items');
    const storageItemsData = JSON.parse(storageItems);
    setItems(storageItemsData ?? []);
  }, []);

  useEffect(() => {
    const _totalItems = calcTotalItems(items);
    const _shipping = calcShipping();
    const _total = _totalItems + _shipping;
    setTotalItems(_totalItems);
    setShipping(_shipping);
    setTotal(_total);
  }, [items]);

  const addItemToCart = (item) => {
    setItems((values) => {
      const data = [...values, item];
      const storageItems = JSON.stringify(data);
      localStorage.setItem('@cart_items', storageItems);
      return data;
    });
  };

  const removeItemToCart = (item) => {
    const data = [...items.filter(({ id }) => id !== item?.id)];
    const storageItems = JSON.stringify(data);
    localStorage.setItem('@cart_items', storageItems);
    setItems(data);
  };

  const clearCart = () => {
    const storageItems = JSON.stringify([]);
    localStorage.setItem('@cart_items', storageItems);
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      shipping,
      total,
      addItemToCart,
      removeItemToCart,
      clearCart,
    }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const cartContext = useContext(CartContext);
  return cartContext;
};
