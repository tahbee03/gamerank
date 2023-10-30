// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Carousel from './components/Carousel.jsx'

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <p>Welcome to GameRank!</p>
        <Carousel />
      </div>
    </>
  )
}

export default App
