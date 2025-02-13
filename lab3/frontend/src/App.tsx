import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Flats from './pages/Flats';
import Agency from './pages/Agency';
import FlatDetails from './pages/FlatDetails';
import Index from './pages/Index';
import ErrorPopup from './components/ErrorPopup';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path="/flats" element={<Flats />} />
        <Route path="/flats/:id" element={<FlatDetails />} />
        <Route path="/agency" element={<Agency />} />
      </Routes>
      <ErrorPopup />
    </Router>
  );
};

export default App;