// import { useState } from 'react'
//import React from 'react';
import './App.css'
import Navbar from './components/Navbar.jsx'
import NoMatch from './components/NoMatch';
import {Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </>
  )
}

export default App
