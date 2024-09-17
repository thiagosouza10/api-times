// src/components/TeamList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';

function TeamList() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('/api/times')
      .then(response => setTeams(response.data))
      .catch(error => console.error('Erro ao carregar os times:', error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Lista de Times
      </Typography>
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add"
        >
          Adicionar Time
        </Button>
      </Box>
      <List>
        {teams.map((team) => (
          <ListItem key={team._id} divider>
            <ListItemText
              primary={team.nome}
              secondary={`Técnico: ${team.tecnico}`}
            />
            <Button
              variant="outlined"
              component={Link}
              to={`/times/${team._id}`}
            >
              Detalhes
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TeamList;