import './App.css';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import TopReviewers from './pages/TopReviewers/TopReviewers.jsx';
import GamePage from './pages/GamePage/GamePage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import NoMatch from './pages/NoMatch/NoMatch.jsx';
import { Route, Routes } from 'react-router-dom';


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile/:username" element={<Profile />} />
        <Route path="/TopReviewers" element={<TopReviewers />} />
        <Route path="/Games/:id" element={<GamePage />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}