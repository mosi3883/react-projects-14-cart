import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  totalPrice: 0,
  totalAmount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatchState({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    dispatchState({ type: 'REMOVE', payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
