const usuarioService = require("../service/usuario.service");
const mongoose = require("mongoose");

// find
const find = async (req, res) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        let found = false;

        const usuario = await usuarioService.findByIdUsuario(id);

        if(usuario != null){
            found = true;
        }

        if(!found){
            res.status(404).send({messege:"Usuário não foi encontrado, tente outro ID"});
        }

        return res.status(200).send(usuario);

    }catch(err){
        console.log(`erro:${err}`);
        return res.status(500).send("erro no servidor, tente novamente mais tarde");
    }

}


// findAll
const findAllUsuarios = async (req, res) => {
    return res.status(200).send(await usuarioService.findAllUsuario());
}


// create
const createUsuario = async (req, res) => {
    const usuario = req.body;

    if (Object.keys(usuario).length === 0) {
        return res.status(400).send({ messege: "O corpo da mensagem está vazio!" });
    }

    // Validação de atributos
    if (!usuario.nome) {
        return res.status(400).send({ messege: "O campo 'nome' não foi encontrado!" });
    }

    if (!usuario.sobrenome) {
        return res.status(400).send({ messege: "O campo 'sobrenome' não foi encontrado!" });
    }

    if (!usuario.idade) {
        return res.status(400).send({ messege: "O campo 'idade' não foi encontrado!" });
    }

    if (!usuario.email) {
        return res.status(400).send({ messege: "O campo 'email' não foi encontrado!" });
    }

    if (!usuario.senha) {
        return res.status(400).send({ messege: "O campo 'senha' não foi encontrado!" });
    }

    return res.status(201).send(await usuarioService.createUsuario
        (usuario));
}


// update
const updateUsuario = async (req, res) => {
    const id = req.params.id;
    const usuario = req.body;
    // let found = false;

    if (Object.keys(usuario).length === 0) {
        return res.status(400).send({ messege: "O corpo da mensagem está vazio!" });
    }

    // Validação de atributos
    if (!usuario.id) {
        return res.status(400).send({ messege: "O campo 'id' não foi encontrado!" });
    }

    if (!usuario.nome) {
        return res.status(400).send({ messege: "O campo 'nome' não foi encontrado!" });
    }

    if (!usuario.sobrenome) {
        return res.status(400).send({ messege: "O campo 'sobrenome' não foi encontrado!" });
    }

    if (!usuario.idade) {
        return res.status(400).send({ messege: "O campo 'idade' não foi encontrado!" });
    }

    if (!usuario.email) {
        return res.status(400).send({ messege: "O campo 'email' não foi encontrado!" });
    }

    if (!usuario.senha) {
        return res.status(400).send({ messege: "O campo 'senha' não foi encontrado!" });
    }

    return res.status(200).send(await usuarioService.updateUsuario(id,usuario));

    // if (!found) {
    //    res.status(404).send({ messege: "Não foi encontrado!" });
   //  }
}


// delete
const deleteUsuario = async (req, res) => {
    const id = req.params.id;
    // let found = false;

    return res.status(200).send(await usuarioService.deleteUsuario(id));

    // if (!found) {
    //   res.status(404).send({ messege: "Não foi encontrado!" });
    //}
}


module.exports = {
    find,
    findAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
}