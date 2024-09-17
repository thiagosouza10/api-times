import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

// Estilo personalizado para borda do TextField
const StyledTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: error ? '#f44336' : '#ccc', // Vermelho se houver erro, padrão se não
    },
    '&:hover fieldset': {
      borderColor: error ? '#f44336' : '#aaa', // Vermelho se houver erro ao passar o mouse
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? '#f44336' : '#4caf50', // Verde se preenchido e foco, vermelho se erro
    },
  },
}));

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
  const [initialLoad, setInitialLoad] = useState(true); // Para marcar se a tela foi carregada
  const navigate = useNavigate();

  useEffect(() => {
    setTouched(true); // Marca o formulário como tocado ao carregar a tela
    setInitialLoad(false); // Atualiza a flag para indicar que a tela foi carregada
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(prevState => ({ ...prevState, [name]: value }));
  };

  const handleBlur = () => {
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

  const getError = (field) => {
    // Campo obrigatório com erro se estiver vazio e a tela já foi carregada
    return !team[field] && ['tecnico', 'nome', 'estadio', 'pais', 'local', 'anoFundacao', 'torcida'].includes(field) && !initialLoad;
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Adicionar Time
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <StyledTextField
            name="tecnico"
            value={team.tecnico}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Técnico"
            variant="outlined"
            error={getError('tecnico')}
            helperText={getHelperText('tecnico')}
          />
          <StyledTextField
            name="nome"
            value={team.nome}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Nome do Time"
            variant="outlined"
            error={getError('nome')}
            helperText={getHelperText('nome')}
          />
          <StyledTextField
            name="estadio"
            value={team.estadio}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Estádio"
            variant="outlined"
            error={getError('estadio')}
            helperText={getHelperText('estadio')}
          />
          <StyledTextField
            name="pais"
            value={team.pais}
            onChange={handleChange}
            onBlur={handleBlur}
            label="País"
            variant="outlined"
            error={getError('pais')}
            helperText={getHelperText('pais')}
          />
          <StyledTextField
            name="local"
            value={team.local}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Local"
            variant="outlined"
            error={getError('local')}
            helperText={getHelperText('local')}
          />
          <StyledTextField
            name="anoFundacao"
            value={team.anoFundacao}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Ano de Fundação"
            variant="outlined"
            error={getError('anoFundacao')}
            helperText={getHelperText('anoFundacao')}
          />
          <StyledTextField
            name="torcida"
            value={team.torcida}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Torcida"
            variant="outlined"
            error={getError('torcida')}
            helperText={getHelperText('torcida')}
          />
          <StyledTextField
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
