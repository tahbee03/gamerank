import './App.css'
import Navbar from './components/Navbar.jsx';
// // import Carousel from './components/Carousel.jsx'
// import Featured from './components/Featured.jsx'
import Profile from './components/Profile/Profile.jsx';
import NoMatch from './components/NoMatch';
// import Footer from './components/Footer.jsx'
import {Route, Routes } from 'react-router-dom';


export default function App() {
  return (
    <div className='gamerrank-page'>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    
      {/* <Carousel />
      <Featured />
      <Footer /> */}
    </div>
  )
}

export default App

// TODO: Create a Home component to replace Navbar
