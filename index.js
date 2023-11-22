const express = require("express");
const app = express();

const usuario = require("./router/usuario.router");
const authService = require("./service/auth.service");
const jwt = require("jsonwebtoken");
const connectToDatabase = require("./database/database");

connectToDatabase();

const port = 3000;
const segredo = "7dC910Mi00Xf306j812wc148hh"

app.use(express.json());

app.use("/usuario", usuario);

app.get("/", (req, res) => {
    console.log(token());
    res.send("Hello World");
});

app.get("/contato", (req, res) => {
    res.send("Nosso contato contato@gmail.com");
});


// Autenticação EMAIL e SENHA
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await authService.loginService(email);

        if (!user) {
            return res.status(400).send({ messege: "Usuario não encontrado, tente novamente!"});
        }

        if (senha != user.senha) {
            return res.status(400).send({ messege: "Senha invalida!"});
        }
        
        // user.token = token();
        // await authService.updatetoken(user);
        // console.log(user);

        const token = authService.generateToken(user,segredo);
        res.status(200).send({
            user,
            token
        });
    }catch(err){
        console.log(`erro: ${err}`);
    }
});

// Verificação TOKEN valido
app.get("/teste-token" , (req,res) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ messege: "O token não foi informado!"});
    }

    const parts = authHeader.split(" ");

    if(parts.length !== 2){
        return res.status(401).send({ messege: "token invalido!"});
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({ messege: "token malformatado!"});
    }

    //Verificação JWT
    jwt.verify(token, segredo, (err, decoded) => {

        if(err){
            console.log(`erro: ${err}`);
            return res.status(500).send({ messege: `erro interno, tente novamente`});
        }

        console.log(decoded);
        res.send(decoded);
    });
});



// Validação TOKEN
app.post("/validar", async (req,res) => {
    const {email, token} = req.body;

    const user = await authService.loginService(email);

    if(!user){
        return res.status(400).send({ messege: "Usuário não encontrado, tente novamente"});
    }

    if(token != user.token){
        return res.status(400).send({ messege: "token incorreto ou expirado, tente novamente"});
    }

    user.token = "";
    await authService.updatetoken(user);

    res.status(200).send(user);
});


// Geração do TOKEN
const token = function() {
    let token = Math.random().toString(36).substring(2);
    return token;
}

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});