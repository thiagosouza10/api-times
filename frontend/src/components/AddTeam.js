// src/components/AddTeam.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

function AddTeam() {
  const [team, setTeam] = useState({
    tecnico: '',
    nome: '',
    estadio: '',
    pais: '',
    local: '',
    anoFundacao: '',
    torcida: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/times', team)
      .then(() => navigate('/'))
      .catch(error => console.error('Erro ao cadastrar time:', error));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Adicionar Time
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="tecnico"
            value={team.tecnico}
            onChange={handleChange}
            label="Técnico"
            variant="outlined"
          />
          <TextField
            name="nome"
            value={team.nome}
            onChange={handleChange}
            label="Nome do Time"
            variant="outlined"
          />
          <TextField
            name="estadio"
            value={team.estadio}
            onChange={handleChange}
            label="Estádio"
            variant="outlined"
          />
          <TextField
            name="pais"
            value={team.pais}
            onChange={handleChange}
            label="País"
            variant="outlined"
          />
          <TextField
            name="local"
            value={team.local}
            onChange={handleChange}
            label="Local"
            variant="outlined"
          />
          <TextField
            name="anoFundacao"
            value={team.anoFundacao}
            onChange={handleChange}
            label="Ano de Fundação"
            variant="outlined"
          />
          <TextField
            name="torcida"
            value={team.torcida}
            onChange={handleChange}
            label="Torcida"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Adicionar Time
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default AddTeam;
