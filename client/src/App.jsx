import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import  { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
<BrowserRouter>
<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/' element= {
    <ProtectedRoutes>
      <Home/>
    </ProtectedRoutes>

  }/>


  </Routes>

   </BrowserRouter>


)
}
export default App
