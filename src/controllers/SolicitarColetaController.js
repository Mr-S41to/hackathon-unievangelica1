const SolicitarColeta = require("../models/SolicitarColeta");

exports.list = async (_, res) => {
    try {
        const coletas = await SolicitarColeta.findAll({ order: [["id", "DESC"]] });
        res.status(200).send(coletas);
    } catch (error) {
        console.error("Erro ao listar coletas:", error);
        res.status(500).send({
            message: "Erro ao listar as solicitações de coleta.",
            error: error.message,
        });
    }
};

exports.save = async (req, res) => {
    console.log("Dados recebidos no corpo da requisição:", req.body);
    const { coords, data, tipoRejeito, status, userId } = req.body;

    try {
        const novaColeta = await SolicitarColeta.create({
            coords,
            data,
            tipoRejeito,
            status,
            userId,
        });

        console.log("Solicitação de coleta criada com sucesso:", novaColeta);
        res.status(201).send({
            message: "Solicitação de coleta registrada com sucesso.",
            data: novaColeta,
        });
    } catch (error) {
        console.error("Erro ao salvar nova solicitação:", error);
        res.status(500).send({
            message: "Erro ao registrar a solicitação de coleta.",
            error: error.message,
        });
    }
};

exports.update = async (req, res) => {
    console.log("Dados recebidos no corpo da requisição:", req.body);
    const { id } = req.params;
    const { coords, data, tipoRejeito, status, userId } = req.body;

    try {
        const solicitacao = await SolicitarColeta.findByPk(id);

        if (!solicitacao) {
            return res.status(404).send({
                message: "Solicitação de coleta não encontrada.",
            });
        }

        if (solicitacao.userId !== userId) {
            return res.status(401).send({
                message: "Você não tem permissão para atualizar essa solicitação.",
            });
        }

        solicitacao.coords = coords;
        solicitacao.data = data;
        solicitacao.tipoRejeito = tipoRejeito;
        solicitacao.status = status;

        await solicitacao.save();
        res.status(200).send({
            message: "Solicitação de coleta atualizada com sucesso.",
            data: solicitacao,
        });
    } catch (error) {
        console.error("Erro ao atualizar solicitação:", error);
        res.status(500).send({
            message: "Erro ao atualizar a solicitação de coleta.",
            error: error.message,
        });
    }
};
