import data from './data';

const calcTotalPrice = (cart) => {
  return cart
    .reduce((acc, cur) => {
      return acc + cur.price * cur.amount;
    }, 0)
    .toFixed(2);
};

const calcTotalAmount = (cart) => {
  return cart.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
};

const reducer = (oldState, action) => {
  if (action.type === 'INIT') {
    const newCart = oldState.cart;
    return {
      ...oldState,
      totalPrice: calcTotalPrice(newCart),
      totalAmount: calcTotalAmount(newCart),
    };
  }

  if (action.type === 'CLEAR_CART') {
    const newCart = [];
    return { ...oldState, cart: newCart, totalPrice: 0, totalAmount: 0 };
  }

  if (action.type === 'REMOVE') {
    const newCart = oldState.cart.filter((item) => item.id !== action.payload);
    return {
      ...oldState,
      cart: newCart,
      totalPrice: calcTotalPrice(newCart),
      totalAmount: calcTotalAmount(newCart),
    };
  }

  if (action.type === 'CHANGE_AMOUNT') {
    const amount = action.payload.amount;

    let newCart = oldState.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          let newAmount = item.amount + amount;
          if (newAmount > item.maxAmount) {
            newAmount = item.maxAmount;
          }
          return { ...item, amount: newAmount };
        }
        return item;
      })
      .filter((item) => item.amount > 0);
    return {
      ...oldState,
      cart: newCart,
      totalPrice: calcTotalPrice(newCart),
      totalAmount: calcTotalAmount(newCart),
    };
  }

  return oldState;
};

export default reducer;
