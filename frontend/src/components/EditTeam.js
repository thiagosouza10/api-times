// src/components/EditTeam.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, CircularProgress, Alert } from '@mui/material';

function EditTeam() {
  const { id } = useParams();
  const [team, setTeam] = useState({
    tecnico: '',
    nome: '',
    estadio: '',
    pais: '',
    local: '',
    anoFundacao: '',
    torcida: '',
    imagem: ''  // Campo para a URL da imagem
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/times/${id}`)
      .then(response => {
        setTeam(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erro ao carregar os dados do time. Por favor, tente novamente mais tarde.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/times/${id}`, team)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setError('Erro ao atualizar o time. Verifique se todos os campos obrigatórios estão preenchidos.');
      });
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Editar Time
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
            Atualizar Time
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/')}
          >
            Voltar para Home
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default EditTeam;
