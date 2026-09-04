import React from 'react';  
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element ={<HomePage/>}/>
      <Route path='/' element= {<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}