 import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
 
 const App = () => {
   return (
     <div className='bg-slate-700'>
    <Navbar/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
     </div>
   )
 }
 
 export default App