export const initialCartState = {
  cartItems:JSON.parse(localStorage.getItem("cart"))||[],
}

const cartActions = {
  ADD_TO_CART: (state, product) => {
    const existingItem = state.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      return {
        ...state,
        cartItems: state.cartItems.map((item) => item.id === product.id ? { ...state, quantity: item.quantity + 1 } : item)
      };
    }
    return {
      ...state,
      cartItems: [...state.cartItems, { ...product, quantity: 1 }]
    }
  },


  QTY_INCREASED: (state, id) => {
    return {
      ...state,
      cartItems: state.cartItems.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    }
  },

  QTY_DECREASED: (state, id) => {
    const targetItem = state.cartItems.find((item) => item.id === id);
    if (targetItem.quantity === 1) {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== id)}
    }
    return {
      ...state,
      cartItems: state.cartItems.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
    }
  },

  CART_REMOVED:(state,id)=>({
      ...state,
      cartItems:state.cartItems.filter((item)=>item.id!==id)
  }),

  CART_CLEAR:(state)=>{
    localStorage.removeItem([])
    return{
      ...state,
      cartItems:[]
    }
  }
}


export const cartReducer = (state, action) => {
  const actionFunction = cartActions[action.type];
  return actionFunction ? actionFunction(state, action.payload) : state;
}