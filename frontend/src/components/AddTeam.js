import React, { useState, useEffect } from 'react';
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
    imagem: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false); // Para marcar se o formulário foi tocado
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(prevState => ({ ...prevState, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(true); // Marca o formulário como tocado ao sair de um campo
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasError = Object.keys(team).some(field => !team[field] && ['tecnico', 'nome', 'estadio', 'pais', 'local', 'anoFundacao', 'torcida'].includes(field));
    
    if (hasError) {
      setError('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    axios.post('/api/times', team)
      .then(() => {
        setSuccess('Time cadastrado com sucesso!');
        setError('');
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(() => {
        setError('Erro ao cadastrar time. Por favor, tente novamente.');
        setSuccess('');
      });
  };

  const getErrorMessage = (field) => {
    if (team[field] || !touched) return '';
    return 'Este campo é obrigatório';
  };

  const getHelperText = (field) => {
    const errorMessage = getErrorMessage(field);
    return errorMessage;
  };

  const getColor = (field) => {
    if (!touched) return 'error';
    return team[field] ? 'success' : 'error';
  };

  useEffect(() => {
    setTouched(false); // Reseta o estado `touched` quando o componente é carregado
  }, []);

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
            onBlur={handleBlur}
            label="Técnico"
            variant="outlined"
            error={getColor('tecnico') === 'error'}
            helperText={getHelperText('tecnico')}
            sx={{ backgroundColor: getColor('tecnico') === 'error' ? '#f8d7da' : (getColor('tecnico') === 'success' ? '#d4edda' : 'white') }}
          />
          <TextField
            name="nome"
            value={team.nome}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Nome do Time"
            variant="outlined"
            error={getColor('nome') === 'error'}
            helperText={getHelperText('nome')}
            sx={{ backgroundColor: getColor('nome') === 'error' ? '#f8d7da' : (getColor('nome') === 'success' ? '#d4edda' : 'white') }}
          />
          <TextField
            name="estadio"
            value={team.estadio}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Estádio"
            variant="outlined"
            error={getColor('estadio') === 'error'}
            helperText={getHelperText('estadio')}
            sx={{ backgroundColor: getColor('estadio') === 'error' ? '#f8d7da' : (getColor('estadio') === 'success' ? '#d4edda' : 'white') }}
          />
          <TextField
            name="pais"
            value={team.pais}
            onChange={handleChange}
            onBlur={handleBlur}
            label="País"
            variant="outlined"
            error={getColor('pais') === 'error'}
            helperText={getHelperText('pais')}
            sx={{ backgroundColor: getColor('pais') === 'error' ? '#f8d7da' : (getColor('pais') === 'success' ? '#d4edda' : 'white') }}
          />
          <TextField
            name="local"
            value={team.local}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Local"
            variant="outlined"
            error={getColor('local') === 'error'}
            helperText={getHelperText('local')}
            sx={{ backgroundColor: getColor('local') === 'error' ? '#f8d7da' : (getColor('local') === 'success' ? '#d4edda' : 'white') }}
          />
          <TextField
            name="anoFundacao"
            value={team.anoFundacao}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Ano de Fundação"
            variant="outlined"
            error={getColor('anoFundacao') === 'error'}
            helperText={getHelperText('anoFundacao')}
            sx={{ backgroundColor: getColor('anoFundacao') === 'error' ? '#f8d7da' : (getColor('anoFundacao') === 'success' ? '#d4edda' : 'white') }}
          />
          <TextField
            name="torcida"
            value={team.torcida}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Torcida"
            variant="outlined"
            error={getColor('torcida') === 'error'}
            helperText={getHelperText('torcida')}
            sx={{ backgroundColor: getColor('torcida') === 'error' ? '#f8d7da' : (getColor('torcida') === 'success' ? '#d4edda' : 'white') }}
          />
          <TextField
            name="imagem"
            value={team.imagem}
            onChange={handleChange}
            onBlur={handleBlur}
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
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Box>
      </form>
    </Container>
  );
}

export default AddTeam;
