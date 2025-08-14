import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'main'

  const handleEnterMain = () => {
    setCurrentPage('main');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage onEnterMain={handleEnterMain} />
      )}
      {currentPage === 'main' && (
        <MainPage onBackToLanding={handleBackToLanding} />
      )}
    </>
  )
}

export default App
