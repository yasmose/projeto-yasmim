import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import ForumPage from './pages/ForumPage';
import PerfilPage from './pages/PerfilPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rota ao abrir o site */}
        <Route path="/" element={<LoginPage />} />
        
        {/* rota após o login */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/livro" element={<BookDetailsPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;