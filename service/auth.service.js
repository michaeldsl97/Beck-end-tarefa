const usuarioAuth = require("../model/usuario");

const jwt = require("jsonwebtoken");

const loginService = (email) => usuarioAuth.findOne({ email });

const generateToken = (user, segredo) => jwt.sign({user}, segredo);

module.exports = { loginService, generateToken };