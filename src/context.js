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

  useEffect(() => {
    dispatchState({ type: 'INIT' });
  }, []);

  const clearCart = () => {
    dispatchState({ type: 'CLEAR_CART' });
  };

  const removeItem = (id) => {
    dispatchState({ type: 'REMOVE', payload: id });
  };

  const increase = (id) => {
    dispatchState({ type: 'CHANGE_AMOUNT', payload: { id: id, amount: 1 } });
  };

  const decrease = (id) => {
    dispatchState({ type: 'CHANGE_AMOUNT', payload: { id: id, amount: -1 } });
  };

  useEffect(() => {
    dispatchState({});
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
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
