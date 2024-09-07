const mongoose = require('mongoose');

// Definindo o schema do time
const TimeSchema = new mongoose.Schema({
    tecnico: { type: String, required: true },
    nome: { type: String, required: true },
    estadio: { type: String, required: true },
    pais: { type: String, required: true },
    local: { type: String, requerid: true },
    anoFundacao: { type: Number, required: true },
    torcida: { type: String, require: true }
});

// Criando o modelo do time
const Time = mongoose.model('Time', TimeSchema);

module.exports = Time;