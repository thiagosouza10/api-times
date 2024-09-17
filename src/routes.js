const express = require('express');
const Time = require('./models'); // Certifique-se de que o caminho para o modelo está correto
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Time:
 *       type: object
 *       required:
 *         - tecnico
 *         - nome
 *         - estadio
 *         - pais
 *         - local
 *         - anoFundacao
 *         - torcida
 *       properties:
 *         tecnico:
 *           type: string
 *           description: Nome do técnico do time
 *           minLength: 3
 *           maxLength: 30
 *         nome:
 *           type: string
 *           description: Nome do time
 *           minLength: 3
 *           maxLength: 30
 *         estadio:
 *           type: string
 *           description: Nome do estádio do time
 *           minLength: 3
 *           maxLength: 30
 *         pais:
 *           type: string
 *           description: País do time
 *           minLength: 3
 *           maxLength: 30
 *         local:
 *           type: string
 *           description: Localização do time
 *           minLength: 3
 *           maxLength: 30
 *         anoFundacao:
 *           type: string
 *           description: Ano de fundação do time (4 dígitos)
 *           minLength: 4
 *           maxLength: 4
 *           pattern: '^[0-9]{4}$'
 *         torcida:
 *           type: string
 *           description: Nome da torcida do time
 *           minLength: 3
 *           maxLength: 30
 *         imagem:
 *           type: string
 *           description: URL da imagem do time
 *           pattern: '^(http|https):\/\/[^ "]+$'
 */

/**
 * @swagger
 * /api/times:
 *   post:
 *     summary: Cadastra um novo time
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Time'
 *     responses:
 *       201:
 *         description: Time cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Time'
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos. Certifique-se de que todos os campos atendem aos requisitos de validação.
 *       500:
 *         description: Erro ao cadastrar time
 */
router.post('/times', async (req, res) => {
    try {
        const { tecnico, nome, estadio, pais, local, anoFundacao, torcida, imagem } = req.body;

        // Verifica se todos os campos obrigatórios estão presentes (imagem é opcional)
        if (!tecnico || !nome || !estadio || !pais || !local || !anoFundacao || !torcida) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios, exceto a imagem' });
        }

        // Normaliza o nome do time para caixa baixa para a comparação
        const nomeNormalizado = nome.toLowerCase();

        // Verifica se já existe um time com o mesmo nome
        const timeExistente = await Time.findOne({ nome: new RegExp(`^${nomeNormalizado}$`, 'i') });

        if (timeExistente) {
            return res.status(400).json({ erro: 'Já existe um time com o mesmo nome' });
        }

        // Cria um novo documento com o Mongoose, incluindo a URL da imagem se fornecida
        const time = new Time({ tecnico, nome, estadio, pais, local, anoFundacao, torcida, imagem });
        await time.save();

        res.status(201).json(time);
    } catch (erro) {
        // Verifica se o erro é de validação
        if (erro.name === 'ValidationError') {
            return res.status(400).json({ erro: erro.message });
        }
        res.status(500).json({ erro: 'Erro ao cadastrar time' });
    }
});

/**
 * @swagger
 * /api/times:
 *   get:
 *     summary: Retorna uma lista de times
 *     responses:
 *       200:
 *         description: Lista de times
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Time'
 *       500:
 *         description: Erro ao listar times
 */
router.get('/times', async (req, res) => {
    try {
        const times = await Time.find();
        res.json(times);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao listar times' });
    }
});

/**
 * @swagger
 * /api/times/{id}:
 *   get:
 *     summary: Consulta um time por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do time
 *     responses:
 *       200:
 *         description: Time encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Time'
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro ao buscar time
 */
router.get('/times/:id', async (req, res) => {
    try {
        const time = await Time.findById(req.params.id);
        if (!time) {
            return res.status(404).json({
                erro: 'Time não encontrado',
                id: req.params.id,
                mensagem: `O time com o ID ${req.params.id} não foi encontrado na base de dados.`
            });
        }
        res.json(time);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar time' });
    }
});

/**
 * @swagger
 * /api/times/nome/{nome}:
 *   get:
 *     summary: Consulta um time pelo nome
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do time
 *     responses:
 *       200:
 *         description: Time encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Time'
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro ao buscar time
 */
router.get('/times/nome/:nome', async (req, res) => {
    try {
        const nomeNormalizado = req.params.nome.toLowerCase();
        const time = await Time.findOne({ nome: new RegExp(`^${nomeNormalizado}$`, 'i') });

        if (!time) {
            return res.status(404).json({
                erro: 'Time não encontrado',
                nome: req.params.nome,
                mensagem: `O time com o nome ${req.params.nome} não foi encontrado na base de dados.`
            });
        }

        res.json(time);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar time' });
    }
});

/**
 * @swagger
 * /api/times/{id}:
 *   put:
 *     summary: Altera os dados de um time
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do time
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Time'
 *     responses:
 *       200:
 *         description: Time atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Time'
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos. Certifique-se de que todos os campos atendem aos requisitos de validação.
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro ao atualizar time
 */
router.put('/times/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { tecnico, nome, estadio, pais, local, anoFundacao, torcida, imagem } = req.body;

        if (!tecnico || !nome || !estadio || !pais || !local || !anoFundacao || !torcida) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios, exceto a imagem' });
        }

        const timeAtualizado = await Time.findByIdAndUpdate(
            id,
            { tecnico, nome, estadio, pais, local, anoFundacao, torcida, imagem },  // Incluindo imagem na atualização
            { new: true, runValidators: true }
        );

        if (!timeAtualizado) {
            return res.status(404).json({ erro: 'Time não encontrado' });
        }

        res.status(200).json(timeAtualizado);
    } catch (erro) {
        if (erro.name === 'ValidationError') {
            return res.status(400).json({ erro: erro.message });
        }
        res.status(500).json({ erro: 'Erro ao atualizar time' });
    }
});

/**
 * @swagger
 * /api/times/{id}:
 *   delete:
 *     summary: Remove um time
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do time
 *     responses:
 *       200:
 *         description: Time removido com sucesso
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro ao deletar time
 */
router.delete('/times/:id', async (req, res) => {
    try {
        const time = await Time.findByIdAndDelete(req.params.id);

        if (!time) {
            return res.status(404).json({ erro: 'Time não encontrado' });
        }

        res.json({ mensagem: 'Time removido com sucesso' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao deletar time' });
    }
});

module.exports = router;
