const express = require('express');
const Time = require('./models');
const router = express.Router();

// Cadastro de times
router.post('/times', async (req, res) => {
    try {
        const { tecnico, nome, estadio, pais, local, anoFundacao, torcida } = req.body;

        // Verificação se todos os campos foram preenchidos
        if (!tecnico || !nome || !estadio || !pais || !local || !anoFundacao || !torcida) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const time = new Time({ tecnico, nome, estadio, pais, local, anoFundacao, torcida });
        await time.save();
        res.status(201).json(time);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar time' });
    }
});

// Listagem de times
router.get('/times', async (req, res) => {
    try {
        const times = await Time.find();
        res.json(times);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar times' });
    }
});

// Consulta de time por ID
router.get('/times/:id', async (req, res) => {
    try {
        const time = await Time.findById(req.params.id);

        if (!time) {
            return res.status(404).json({ error: 'Time não encontrado' });
        }

        res.json(time);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar time' });
    }
});

// Altrera os dados de um time
router.put('/times/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { tecnico, nome, estadio, pais, local, anoFundacao, torcida } = req.body;

        // Verificação se todos os campos foram preenchidos
        if (!tecnico || !nome || !estadio || !pais || !local || !anoFundacao || !torcida) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        // Atualizar o time existente no banco de dados
        const time = await Time.findByIdAndUpdate(
            id,
            { tecnico, nome, estadio, pais, local, anoFundacao, torcida },
            { new: true } // Retornar o time atualizado
        );

        // Verificar se o time foi encontrado e atualizado
        if (!time) {
            return res.status(404).json({ error: 'Time não encontrado' });
        }

        res.status(200).json(time);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar time' });
    }
});


// Remoção de time
router.delete('/times/:id', async (req, res) => {
    try {
        const time = await Time.findByIdAndDelete(req.params.id);

        if (!time) {
            return res.status(404).json({ error: 'Time não encontrado' });
        }

        res.json({ message: 'Time removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar time' });
    }
});

module.exports = router;