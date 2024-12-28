
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change 'Switch' to 'Routes'
import HomePage from './components/HomePage';
import CompressPage from './components/CompressPage';
import DecompressPage from './components/DecompressPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Replace <Switch> with <Routes> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/compress" element={<CompressPage />} />
          <Route path="/decompress" element={<DecompressPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
