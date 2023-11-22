const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: true},
    idade: { type: Number, required: true},
    email: { type: String, required: true, unique: true},
    senha: { type: Number, required: true},
    token: { type: String, required: true},
});

const Usuario = mongoose.model("usuario",usuarioSchema);

module.exports = Usuario;