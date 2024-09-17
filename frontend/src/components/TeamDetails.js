// src/components/TeamDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';

function TeamDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/times/${id}`)
      .then(response => {
        setTeam(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erro ao carregar os detalhes do time');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!team) return null;

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        {team.nome}
      </Typography>
      {team.imagem && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <img src={team.imagem} alt={team.nome} style={{ maxWidth: '100%', height: 'auto' }} />
        </Box>
      )}
      <Typography variant="h6" component="h2">
        Técnico: {team.tecnico}
      </Typography>
      <Typography variant="body1">
        Estádio: {team.estadio}
      </Typography>
      <Typography variant="body1">
        País: {team.pais}
      </Typography>
      <Typography variant="body1">
        Local: {team.local}
      </Typography>
      <Typography variant="body1">
        Ano de Fundação: {team.anoFundacao}
      </Typography>
      <Typography variant="body1">
        Torcida: {team.torcida}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()}
        >
          Voltar
        </Button>
      </Box>
    </Container>
  );
}

export default TeamDetails;
