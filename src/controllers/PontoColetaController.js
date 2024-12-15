const PontoColeta = require("../models/PontoColeta");

exports.list = async (_, res) => {
    PontoColeta.findAll({
        order: [["id", "DESC"]],
    })
        .then((posts) => res.send(posts))
        .catch((error) => console.error(error));
};


exports.save = async (req, res) => {
    console.log("Dados recebidos no corpo da requisição:", req.body);
    const {
        id,
        coords
    } = req.body;

    PontoColeta.create({
        id,
        coords
    })
        
    .then((post) => {
        console.log("Ponto de Coleta criado com sucesso:", post);
        res.send(post);
    })
    .catch((error) => {
        console.error("Erro ao salvar novo ponto de coleta:", error);
        res.status(500).send("Internal Server Error");
    });
}