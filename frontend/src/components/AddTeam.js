import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

// Estilo personalizado para o componente TextField
const StyledTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: error ? '#f44336' : '#ccc', // Define a cor da borda com base no erro
    },
    '&:hover fieldset': {
      borderColor: error ? '#f44336' : '#aaa', // Altera a cor da borda ao passar o mouse
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? '#f44336' : '#4caf50', // Verde quando o campo está focado e não há erro, vermelho se houver erro
    },
  },
}));

function AddTeam() {
  // Estado para armazenar os dados do time
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

  // Estado para mensagens de sucesso e erro
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Estado para marcar se o formulário foi tocado e se a tela foi carregada
  const [touched, setTouched] = useState(false); 
  const [initialLoad, setInitialLoad] = useState(true);

  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // Hook que marca o formulário como tocado e atualiza a flag de carregamento da tela
  useEffect(() => {
    setTouched(true); 
    setInitialLoad(false);
  }, []);

  // Função para lidar com mudanças nos campos de entrada
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(prevState => ({ ...prevState, [name]: value }));
  };

  // Função para marcar o formulário como tocado quando um campo perde o foco
  const handleBlur = () => {
    setTouched(true); 
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se algum dos campos obrigatórios está vazio
    const hasError = Object.keys(team).some(field => !team[field] && ['tecnico', 'nome', 'estadio', 'pais', 'local', 'anoFundacao', 'torcida'].includes(field));
    
    if (hasError) {
      setError('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    // Envia os dados do time para a API
    axios.post('/api/times', team)
      .then(() => {
        setSuccess('Time cadastrado com sucesso!');
        setError('');
        setTimeout(() => navigate('/'), 2000); // Redireciona após 2 segundos
      })
      .catch(() => {
        setError('Erro ao cadastrar time. Por favor, tente novamente.');
        setSuccess('');
      });
  };

  // Função para obter a mensagem de erro de um campo
  const getErrorMessage = (field) => {
    if (team[field] || !touched) return '';
    return 'Este campo é obrigatório';
  };

  // Função para obter o texto auxiliar de um campo
  const getHelperText = (field) => {
    const errorMessage = getErrorMessage(field);
    return errorMessage;
  };

  // Função para determinar se um campo tem erro
  const getError = (field) => {
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
