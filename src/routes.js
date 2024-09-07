const express = require('express');
const Time = require('./models');
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
 *         nome:
 *           type: string
 *           description: Nome do time
 *         estadio:
 *           type: string
 *           description: Nome do estádio do time
 *         pais:
 *           type: string
 *           description: País do time
 *         local:
 *           type: string
 *           description: Localização do time
 *         anoFundacao:
 *           type: integer
 *           description: Ano de fundação do time
 *         torcida:
 *           type: string
 *           description: Nome da torcida do time
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
 *         description: Campos obrigatórios ausentes
 *       500:
 *         description: Erro ao cadastrar time
 */
router.post('/times', async (req, res) => {
    try {
        const { tecnico, nome, estadio, pais, local, anoFundacao, torcida } = req.body;
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
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar times' });
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
                error: 'Time não encontrado',
                id: req.params.id,
                message: `O time com o ID ${req.params.id} não foi encontrado na base de dados.`
            });
        }
        res.json(time);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar time' });
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
 *       400:
 *         description: Campos obrigatórios ausentes
 *       404:
 *         description: Time não encontrado
 *       500:
 *         description: Erro ao atualizar time
 */
router.put('/times/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { tecnico, nome, estadio, pais, local, anoFundacao, torcida } = req.body;

        if (!tecnico || !nome || !estadio || !pais || !local || !anoFundacao || !torcida) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const timeExists = await Time.findById(id);
        if (!timeExists) {
            return res.status(404).json({ error: 'Time não encontrado' });
        }

        const updatedTime = await Time.findByIdAndUpdate(
            id,
            { tecnico, nome, estadio, pais, local, anoFundacao, torcida },
            { new: true }
        );

        res.status(200).json(updatedTime);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar time' });
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
            return res.status(404).json({ error: 'Time não encontrado' });
        }

        res.json({ message: 'Time removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar time' });
    }
});

module.exports = router;