const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Rotas = sequelize.define("rotas", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    horarioInicio: {
        type: Sequelize.TIME,
    },
    horarioFim: {
        type: Sequelize.TIME,
    },
    pontos: {
        type: Sequelize.JSON, //Campo para armazenar uma lista de pontos.
        defaultValue: [], //Inicia como uma lista vazia.
        validate: {
            isArray(value) {
                if (!Array.isArray(value)) {
                    throw new Error("Pontos deve ser uma lista de objetos!");
                }
            },
        },
    },
});

sequelize
  .sync({ force: false })
  .then(() => console.log("Tabela Rotas iniciada!"))
  .catch((error) => console.log("Erro ao iniciar a tabela Rotas.", error));

module.exports = Rotas;