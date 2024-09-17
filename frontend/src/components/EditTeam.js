import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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

function EditTeam() {
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
  // Estados para armazenar mensagens de sucesso e erro
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  // Estado para verificar se o formulário foi tocado
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate(); // Hook para navegação
  const { id } = useParams(); // Hook para pegar parâmetros da URL

  // Efeito para carregar os dados do time quando o componente é montado
  useEffect(() => {
    axios.get(`/api/times/${id}`)
      .then(response => {
        setTeam(response.data); // Atualiza o estado com os dados do time
      })
      .catch(() => {
        setError('Erro ao carregar os detalhes do time. Por favor, tente novamente.');
      });
  }, [id]); // Recarrega quando o id muda

  // Função para atualizar o estado com os valores dos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(prevState => ({ ...prevState, [name]: value }));
  };

  // Função para marcar o formulário como tocado ao sair de um campo
  const handleBlur = () => {
    setTouched(true);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifica se todos os campos obrigatórios foram preenchidos
    const hasError = Object.keys(team).some(field => !team[field] && ['tecnico', 'nome', 'estadio', 'pais', 'local', 'anoFundacao', 'torcida'].includes(field));
    
    if (hasError) {
      setError('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    // Envia os dados atualizados do time para o servidor
    axios.put(`/api/times/${id}`, team)
      .then(() => {
        setSuccess('Time atualizado com sucesso!');
        setError('');
        setTimeout(() => navigate('/'), 2000); // Navega para a página inicial após 2 segundos
      })
      .catch(() => {
        setError('Erro ao atualizar time. Por favor, tente novamente.');
        setSuccess('');
      });
  };

  // Função para obter a mensagem de erro para um campo específico
  const getErrorMessage = (field) => {
    if (team[field] || !touched) return '';
    return 'Este campo é obrigatório';
  };

  // Função para obter o texto auxiliar para um campo específico
  const getHelperText = (field) => {
    const errorMessage = getErrorMessage(field);
    return errorMessage;
  };

  // Função para determinar se um campo tem erro
  const getError = (field) => {
    return !team[field] && touched;
  };

  // Efeito para resetar o estado `touched` quando o componente é carregado
  useEffect(() => {
    setTouched(false);
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Editar Time
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
            Atualizar Time
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

export default EditTeam;
