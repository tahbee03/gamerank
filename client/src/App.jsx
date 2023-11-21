import './App.css'
import Navbar from './components/Navbar.jsx'
import UncontrolledExample from './components/Carousel.jsx'
import NoMatch from './components/NoMatch';
import {Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>}/>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
      <UncontrolledExample />
    </>
  )
}

export default App
