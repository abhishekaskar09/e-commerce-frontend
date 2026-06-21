import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
 
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  
// render products
  const renderProducts = async() => {
    try {
      const response =await axios.get('https://fakestoreapi.com/products?limit=20');
       setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    renderProducts();
  },[]);


  
  
  return (
    <ProductContext.Provider value={{
      product,search,setSearch,category,setCategory}}>
      {children}
    </ProductContext.Provider>
  )
}