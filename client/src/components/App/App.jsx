import './App.css';
import Home from '../Home/Home.jsx';
import Profile from '../Profile/Profile.jsx';
import NoMatch from '../NoMatch/NoMatch.jsx';
import { Route, Routes } from 'react-router-dom';


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}