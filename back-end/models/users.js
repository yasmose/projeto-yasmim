const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    id : {
        type: String,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        reqyured: true,
        unique: true
    },
    senha:{
        type: String,
        required: true
    },
    grauDeEnsino: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema)