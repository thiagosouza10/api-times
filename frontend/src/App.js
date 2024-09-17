// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TeamList from './components/TeamList';
import AddTeam from './components/AddTeam';
import TeamDetails from './components/TeamDetails';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/add" element={<AddTeam />} />
          <Route path="/times/:id" element={<TeamDetails />} />
          <Route path="/" element={<TeamList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
