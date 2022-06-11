const reducer = (oldState, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...oldState, cart: [] };
  }

  if (action.type === 'REMOVE') {
    return { ...oldState, cart: oldState.cart.filter((item) => item.id !== action.payload) };
  }

  return oldState;
};

export default reducer;
