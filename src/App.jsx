 import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
 
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