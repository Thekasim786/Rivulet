import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavbarLogout from './components/NavbarLogout';

import SignupPage from './components/SignupPage'
import LandingPage from './components/LandingPage';

import Login from './components/login';
import HomePage from './components/Homepage';
import VideoPlayerPage from './components/VideoPlayerPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import RefrshHandler from './RefrshHandler';
import './app.css'

import Navbar from './components/Navbar';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div>
    
    <BrowserRouter>
    <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/homepage" element={<HomePage />} /> */}
        <Route path="/video/:id" element={<VideoPlayerPage />} />
        <Route path='/homepage' element={<PrivateRoute element={<HomePage />} />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
