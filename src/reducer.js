const reducer = (oldState, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...oldState, cart: [] };
  }

  if (action.type === 'REMOVE') {
    return { ...oldState, cart: oldState.cart.filter((item) => item.id !== action.payload) };
  }

  if (action.type === 'INCREASE') {
    let newCart = oldState.cart.map((item) => {
      if (item.id === action.payload) {
        const newAmount = item.amount + 1;

        return { ...item, amount: newAmount > 9 ? 9 : newAmount };
      }
      return item;
    });
    return { ...oldState, cart: newCart };
  }

  if (action.type === 'DECREASE') {
    let newCart = oldState.cart
      .map((item) => {
        if (item.id === action.payload) {
          const newAmount = item.amount - 1;
          return { ...item, amount: newAmount };
        }
        return item;
      })
      .filter((item) => item.amount > 0);
    return { ...oldState, cart: newCart };
  }

  return oldState;
};

export default reducer;
