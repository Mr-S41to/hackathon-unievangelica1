const Veiculo = require("../models/Veiculos");

exports.save = async (req, res) => {
    console.log("Dados recebidos no corpo da requisição:", req.body);

    const {
        id,
        placa,
        tipo,
        numero,
        userId
    } = req.body;

    Veiculo.create({
        id,
        placa,
        tipo,
        numero,
        userId
    })
        .then((post) => {
            console.log("Veiculo criado com sucesso:", post);
            res.send(post);
        })
        .catch((error) => {
            console.error("Erro ao salvar novo veiculo:", error);
            res.status(500).send("Internal Server Error");
        });
}

exports.getByUserId = async (req, res) => {
    const userId = req.params.userId;

    try{
        const veiculos = await Veiculo.findAll({
            where: {userId},
            order: [["id", "DESC"]],
        });

        if(!veiculos || veiculos.length === 0) {
            return res.status(404).send({
                messege: "Veiculo não encontrado"
            });
        }

        res.send(veiculos);
    } catch(error) {
        console.error("Erro ao buscar veiculos:", error);
        res.status(500).send("Internal ServerError");
    }
}