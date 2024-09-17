import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, CircularProgress, Alert, TextField, Modal } from '@mui/material';
import { Edit, Delete, Info } from '@mui/icons-material'; // Importando ícones

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Mensagem de sucesso
  const [searchName, setSearchName] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [open, setOpen] = useState(false); // Estado para o modal
  const [teamToDelete, setTeamToDelete] = useState(null); // Estado para o time a ser excluído

  useEffect(() => {
    axios.get('/api/times')
      .then(response => {
        setTeams(response.data);
        setFilteredTeams(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao carregar os times. Por favor, tente novamente mais tarde.');
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (searchName.trim()) {
      axios.get(`/api/times/nome/${searchName.trim()}`)
        .then(response => {
          setFilteredTeams([response.data]);
          setError(null);
          setSuccess(null); // Limpa a mensagem de sucesso, se houver
        })
        .catch(() => {
          setFilteredTeams([]);
          setError(`O time com o nome "${searchName}" não foi encontrado.`);
          setSuccess(null); // Limpa a mensagem de sucesso, se houver
        });
    } else {
      setFilteredTeams(teams);
      setError(null);
      setSuccess(null); // Limpa a mensagem de sucesso, se houver
    }
  };

  const handleDelete = () => {
    if (teamToDelete) {
      axios.delete(`/api/times/${teamToDelete}`)
        .then(() => {
          setTeams(teams.filter(team => team._id !== teamToDelete));
          setFilteredTeams(filteredTeams.filter(team => team._id !== teamToDelete));
          setSuccess('Time excluído com sucesso!'); // Mensagem de sucesso
          setError(null); // Limpa a mensagem de erro, se houver
        })
        .catch(() => {
          setError('Erro ao deletar o time. Por favor, tente novamente mais tarde.');
          setSuccess(null); // Limpa a mensagem de sucesso, se houver
        });
      setOpen(false); // Fechar o modal após a exclusão
    }
  };

  const handleOpen = (id) => {
    setTeamToDelete(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  if (loading) return <CircularProgress />;

  return (
    <Container sx={{ position: 'relative' }}>
      <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '60px' }}>
        <Typography
          id="title"
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: '600',
            color: '#333',
            textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            fontFamily: '"Roboto", sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            mb: 4
          }}
        >
          Cadastro de Times
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            id="add-team-button"
            variant="contained"
            color="primary"
            component={Link}
            to="/add"
          >
            Adicionar Time
          </Button>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <TextField
              id="search-field"
              label="Buscar por Nome"
              variant="outlined"
              size="small"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              sx={{ maxWidth: 300 }}
            />
            <Button
              id="search-button"
              variant="contained"
              color="secondary"
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Box>
        </Box>
      </Box>
      {success && <Alert id="success-alert" severity="success">{success}</Alert>}
      {error && <Alert id="error-alert" severity="error">{error}</Alert>}
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
                id={`info-button-${team._id}`}
                variant="outlined"
                component={Link}
                to={`/times/${team._id}`}
              >
                <Info />
              </Button>
              <Button
                id={`edit-button-${team._id}`}
                variant="outlined"
                color="secondary"
                component={Link}
                to={`/edit/${team._id}`}
              >
                <Edit />
              </Button>
              <Button
                id={`delete-button-${team._id}`}
                variant="outlined"
                color="error"
                onClick={() => handleOpen(team._id)}
              >
                <Delete />
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Modal de confirmação */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Confirmar Exclusão
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Você tem certeza que deseja excluir este time?
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleDelete} color="error">Excluir</Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default TeamList;
