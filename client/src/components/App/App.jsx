import './App.css';
import Home from '../Home/Home.jsx';
import Profile from '../Profile/Profile.jsx';
import TopReviewers from '../TopReviewers/TopReviewers.jsx';
import GamePage from '../GamePage/GamePage.jsx';
import NoMatch from '../NoMatch/NoMatch.jsx';
import { Route, Routes } from 'react-router-dom';


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile/:username" element={<Profile />} />
        <Route path="/TopReviewers" element={<TopReviewers />} />
        <Route path="/Games/:id" element={<GamePage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}