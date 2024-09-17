// src/App.js ou src/Routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamList from './components/TeamList';
import AddTeam from './components/AddTeam';
import EditTeam from './components/EditTeam';
import TeamDetails from './components/TeamDetails';  // Supondo que você tenha um componente de detalhes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamList />} />
        <Route path="/add" element={<AddTeam />} />
        <Route path="/edit/:id" element={<EditTeam />} />
        <Route path="/times/:id" element={<TeamDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
