import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
 

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
 
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  
// render products
  const renderProducts = async() => {
    try {
      setLoading(true);
      const response =await axios.get('https://fakestoreapi.com/products?limit=20');
       setProduct(response.data); 
       setError(null);
    } catch (error) {
      setError("server error in apiDataFetch")
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    renderProducts();
  },[]);


  
  
  return (
    <ProductContext.Provider value={{
      product,search,setSearch,category,setCategory,error,loading}}>
      {children}
    </ProductContext.Provider>
  )
}
 