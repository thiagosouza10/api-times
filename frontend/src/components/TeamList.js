// src/components/TeamList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, CircularProgress, Alert, TextField } from '@mui/material';

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);

  useEffect(() => {
    axios.get('/api/times')
      .then(response => {
        setTeams(response.data);
        setFilteredTeams(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erro ao carregar os times. Por favor, tente novamente mais tarde.');
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (searchName) {
      axios.get(`/api/times/nome/${searchName}`)
        .then(response => {
          setFilteredTeams([response.data]);
        })
        .catch(() => {
          setFilteredTeams([]);
          setError('Time não encontrado');
        });
    } else {
      setFilteredTeams(teams);
      setError(null);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`/api/times/${id}`)
      .then(() => {
        setTeams(teams.filter(team => team._id !== id));
        setFilteredTeams(filteredTeams.filter(team => team._id !== id));
      })
      .catch(() => {
        setError('Erro ao deletar o time. Por favor, tente novamente mais tarde.');
      });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Lista de Times
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add"
        >
          Adicionar Time
        </Button>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label="Buscar por Nome"
            variant="outlined"
            size="small"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            sx={{ maxWidth: 300 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearch}
          >
            Buscar Time
          </Button>
        </Box>
      </Box>
      <List>
        {filteredTeams.map((team) => (
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
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(team._id)}
              >
                Deletar
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default TeamList;
