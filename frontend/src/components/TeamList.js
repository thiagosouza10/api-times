// src/components/TeamList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, CircularProgress, Alert } from '@mui/material';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/times')
      .then(response => {
        setTeams(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erro ao carregar os times. Por favor, tente novamente mais tarde.');
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

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
            {team.imagem && (
              <Box sx={{ mr: 2 }}>
                <img src={team.imagem} alt={team.nome} style={{ width: 50, height: 50, objectFit: 'cover' }} />
              </Box>
            )}
            <ListItemText
              primary={team.nome}
              secondary={`Técnico: ${team.tecnico}`}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                component={Link}
                to={`/times/${team._id}`}
              >
                Detalhes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to={`/edit/${team._id}`}
              >
                Editar
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TeamList;
