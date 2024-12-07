const SolicitarColeta = require("../models/SolicitarColeta");

exports.list = async (_, res) => {
    SolicitarColeta.findAll({
        order: [["id", "DESC"]],
    })
        .then((posts) => res.send(posts))
        .catch((error) => console.error(error));
};

exports.save = async (req, res) => {
    console.log("Dados recebidos no corpo da requisição:", req.body);
    const {
        id,
        coords,
        data,
        tipoRejeito,
        status,
        userId
    } = req.body;

    SolicitarColeta.create({
        id,
        coords,
        data,
        tipoRejeito,
        status,
        userId
    })
        .then((post) => {
            console.log("Solicitação bem sucedida:", post);
            res.status(201).send({
                message: "Solicitação de coleta registrada com sucesso.",
                data: post,
            });
        })
        .catch((error) => {
            console.error("Erro ao salvar nova solicitação:", error);
            res.status(500).send({
                message: "Erro ao registrar a solicitação de coleta.",
                error: error.message,
            });
        });
}

exports.update = async (req, res) => {
    console.log("Dados recebidos no corpo da requisição:", req.body);
    const { id } = req.params;
    const {
        coords,
        data,
        tipoRejeito,
        status,
        userId
    } = req.body;

    try {
        let solicitaco = await SolicitarColeta.findById(id);

        if (!solicitaco) {
            return res.status(404).send({
                message: "Solicitação não encontrada."
            });
        }

        if (userId === solicitaco.userId) {
            solicitaco.lat = lat;
            solicitaco.long = long;
            solicitaco.data = data;
            solicitaco.tipoRejeito = tipoRejeito;
            solicitaco.status = status;
            solicitaco.userId = userId;

            await solicitaco.save();
            res.send(solicitaco);
        } else {
            return res.status(401).send({
                message: "Você não tem permissão para atualizar essa solicitação."
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
}