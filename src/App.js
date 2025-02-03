import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodList from './pages/FoodList';
import FoodComponents from './pages/FoodComponents';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/foods/:foodId" element={<FoodComponents />} />
      </Routes>
    </Router>
  );
};

export default App;
