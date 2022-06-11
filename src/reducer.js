const reducer = (oldState, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...oldState, cart: [] };
  }

  return oldState;
};

export default reducer;
