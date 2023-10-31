import './App.css'
import Navbar from './components/Navbar.jsx'
import Carousel from './components/Carousel.jsx'
import NoMatch from './components/NoMatch';
import {Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
      <Carousel />
    </>
  )
}

export default App
