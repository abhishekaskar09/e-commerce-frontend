import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { cartReducer, initialCartState } from "../reducer/CartReducer";
 import { useNavigate } from "react-router";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  

       // add to cart  
 

  // increased qty
  const quantityIncreased = (id) => {
    dispatch({
      type: 'QTY_INCREASED',
      payload: id
    })
  }

  //  decreased qty
  const quantityDecreased = (id) => {
    dispatch({
      type: 'QTY_DECREASED',
      payload: id
    });
  }



  const removedItem = (id) => {
    dispatch({
      type: 'CART_REMOVED',
      payload: id
    });
  }


  const clearCartitems=(item)=>{
    dispatch({
      type:'CART_CLEAR',
      payload:item
    })
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{
      quantityIncreased, quantityDecreased, removedItem,
      cart: state.cartItems,dispatch
    }}>
      {children}
    </CartContext.Provider>
  )
}