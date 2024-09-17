// src/components/AddTeam.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';

function AddTeam() {
  const [team, setTeam] = useState({
    tecnico: '',
    nome: '',
    estadio: '',
    pais: '',
    local: '',
    anoFundacao: '',
    torcida: '',
    imagem: ''  // Adicione este campo para a URL da imagem
  });
  const [success, setSuccess] = useState(''); // Estado para mensagem de sucesso
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/times', team)
      .then(() => {
        setSuccess('Time cadastrado com sucesso!'); // Mensagem de sucesso
        setError('');
        setTimeout(() => navigate('/'), 2000); // Navega para a home após 2 segundos
      })
      .catch(error => {
        setError('Erro ao cadastrar time. Por favor, tente novamente.');
        setSuccess('');
      });
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
          <TextField
            name="imagem"
            value={team.imagem}
            onChange={handleChange}
            label="Imagem URL"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Adicionar Time
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/')}
          >
            Voltar para Home
          </Button>
          {success && <Alert severity="success">{success}</Alert>} {/* Mensagem de sucesso */}
          {error && <Alert severity="error">{error}</Alert>} {/* Mensagem de erro */}
        </Box>
      </form>
    </Container>
  );
}

export default AddTeam;
