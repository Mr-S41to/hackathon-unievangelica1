const Rota = require("../models/Rotas");

exports.list = async (_, res) => {
    Rota.findAll({
        order: [["id", "DESC"]],
    })
        .then((posts) => res.send(posts))
        .catch((error) => console.error(error));
};

exports.save = async (req, res) => {
    console.log("Dados recebidos no corpo da requisição:", req.body);
    const {
        id,
        horarioInicio,
        horarioFim,
        pontos
    } = req.body;

    if (!Array.isArray(pontos) || pontos.length === 0) {
        return res.status(400).send({
            message: "A lista de pontos deve ser um array não vazio.",
        });
    }

    Rota.create({
        id,
        horarioInicio,
        horarioFim,
        pontos
      })
        .then((post) => {
          console.log("Rota criada com sucesso:", post);
          res.send(post);
        })
        .catch((error) => {
          console.error("Erro ao salvar novo rota:", error);
          res.status(500).send("Internal Server Error");
        });
}