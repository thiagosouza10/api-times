// src/components/TeamDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Box, CircularProgress, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
      <Typography variant="h4" component="h1" align="center" gutterBottom id="team-name">
        {team.nome}
      </Typography>
      {team.imagem && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <img src={team.imagem} alt={team.nome} style={{ maxWidth: '100%', height: 'auto' }} id="team-image"/>
        </Box>
      )}
      <TableContainer component={Paper} sx={{ mt: 2, maxWidth: 600, margin: 'auto' }} id="team-details-table">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Typography variant="h6" id="table-title">Detalhes do Time</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><strong id="label-tecnico">Técnico:</strong></TableCell>
              <TableCell id="value-tecnico">{team.tecnico}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong id="label-estadio">Estádio:</strong></TableCell>
              <TableCell id="value-estadio">{team.estadio}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong id="label-pais">País:</strong></TableCell>
              <TableCell id="value-pais">{team.pais}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong id="label-local">Local:</strong></TableCell>
              <TableCell id="value-local">{team.local}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong id="label-ano-fundacao">Ano de Fundação:</strong></TableCell>
              <TableCell id="value-ano-fundacao">{team.anoFundacao}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong id="label-torcida">Torcida:</strong></TableCell>
              <TableCell id="value-torcida">{team.torcida}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.history.back()} // Volta para a página anterior
          id="back-button"
        >
          Voltar
        </Button>
      </Box>
    </Container>
  );
}

export default TeamDetails;
