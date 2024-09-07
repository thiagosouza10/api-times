const mongoose = require('mongoose');

// Definindo o schema do time com validações de comprimento
const TimeSchema = new mongoose.Schema({
    tecnico: { 
        type: String, 
        required: true,
        minlength: 3, 
        maxlength: 30 
    },
    nome: { 
        type: String, 
        required: true,
        minlength: 3, 
        maxlength: 30 
    },
    estadio: { 
        type: String, 
        required: true,
        minlength: 3, 
        maxlength: 30 
    },
    pais: { 
        type: String, 
        required: true,
        minlength: 3, 
        maxlength: 30 
    },
    local: { 
        type: String, 
        required: true,
        minlength: 3, 
        maxlength: 30 
    },
    anoFundacao: { 
        type: String,  // Usando String para validação de comprimento exato
        required: true,
        minlength: 4, 
        maxlength: 4,
        match: /^[0-9]{4}$/ // Garantindo que é um número de 4 dígitos
    },
    torcida: { 
        type: String, 
        required: true,
        minlength: 3, 
        maxlength: 30 
    }
});

// Criando o modelo do time
const Time = mongoose.model('Time', TimeSchema);

module.exports = Time;