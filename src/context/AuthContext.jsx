import { createContext, useEffect, useReducer, useState } from "react";
import { AuthReducer, initialAuthState } from "../reducer/AuthReducer";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{

  const [state,dispatch]=useReducer(AuthReducer,initialAuthState);
    const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });


    const [login, setLogin] = useState({
      email: "",
      password: "",
    });
  

  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(state.user));
  },[state.user])

  return(
    <AuthContext.Provider value={{user:state.user,dispatch,setSignup,signup,login,setLogin}}>
      {children}
    </AuthContext.Provider>
  )
}