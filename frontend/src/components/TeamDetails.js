// src/components/TeamDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

function TeamDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    axios.get(`/api/times/${id}`)
      .then(response => setTeam(response.data))
      .catch(error => console.error('Erro ao carregar os detalhes do time:', error));
  }, [id]);

  if (!team) return <Typography>Carregando...</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        {team.nome}
      </Typography>
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
