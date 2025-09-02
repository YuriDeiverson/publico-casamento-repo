// src/App.tsx

import  { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import About from './components/About';
import DressCode from './components/DressCode';
import Adress from './components/Adress';
import GiftsList from './components/GiftsList';
import ConfirmPresence from './components/ConfirmPresence';
import Login from './components/Login';
import AdminConfirmations from './components/AdminConfirmations';

// A inicialização do Firebase foi movida para o arquivo `src/firebase.ts`
// Portanto, não é mais necessária aqui.

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar onNavigate={handleNavigate} />
      
      {currentPage === 'home' && (
        <>
          <Header />
          <About />
          <DressCode />
          <Adress />
          <GiftsList />
        </>
      )}
      {currentPage === 'confirm-presence' && (
        <ConfirmPresence onNavigate={handleNavigate} />
      )}
      {currentPage === 'login' && (
        <Login onNavigate={handleNavigate} />
      )}
      {currentPage === 'admin-confirmations' && (
        <AdminConfirmations onNavigate={handleNavigate} />
      )}
    </>
  );
}

export default App;