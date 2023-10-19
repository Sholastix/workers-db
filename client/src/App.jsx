import { useState, Fragment } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

import './App.css';

import Homepage from './components/Homepage/Homepage';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
