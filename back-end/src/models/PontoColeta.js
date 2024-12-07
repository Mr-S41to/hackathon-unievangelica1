const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const PontoColeta = sequelize.define("ponto-coleta", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    lat: {
        type: Sequelize.FLOAT,
        validate: {
            min: -90,
            max: 90,
        },
    },
    long: {
        type: Sequelize.FLOAT,
        validate: {
            min: -180,
            max: 180,
        },
    },
});

sequelize
    .sync({ force: false })
    .then(() => console.log("Tabela PontoColeta iniciada!"))
    .catch((error) => console.log("Erro ao iniciar a tabela PontoColeta.", error));

module.exports = PontoColeta;