// src/components/TeamDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';

function TeamDetails() {
  // Obtém o ID do time a partir dos parâmetros da URL
  const { id } = useParams();
  // Estado para armazenar os dados do time
  const [team, setTeam] = useState(null);
  // Estado para indicar o carregamento dos dados
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);

  // Efeito para buscar os detalhes do time quando o componente é montado
  useEffect(() => {
    axios.get(`/api/times/${id}`)
      .then(response => {
        setTeam(response.data); // Atualiza o estado com os dados do time
        setLoading(false); // Marca o carregamento como concluído
      })
      .catch(error => {
        setError('Erro ao carregar os detalhes do time'); // Define mensagem de erro em caso de falha
        setLoading(false); // Marca o carregamento como concluído mesmo em erro
      });
  }, [id]); // Recarrega quando o id muda

  // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
  if (loading) return <CircularProgress />;
  // Exibe uma mensagem de erro se houver algum problema ao carregar os dados
  if (error) return <Alert severity="error">{error}</Alert>;
  // Se não houver dados do time, não exibe nada
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
          onClick={() => window.history.back()} // Volta para a página anterior
        >
          Voltar
        </Button>
      </Box>
    </Container>
  );
}

export default TeamDetails;
