// import { useState } from 'react'
//import React from 'react';
import './App.css'
import Navbar from './components/Navbar.jsx';
// import Carousel from './components/Carousel.jsx'
import Profile from './components/Profile/Profile.jsx';
import NoMatch from './components/NoMatch';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

export default App

// TODO: Create a Home component to replace Navbar
