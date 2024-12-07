const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const SolicitarColeta = sequelize.define("solicitar-coleta", {
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
    data: {
        type: Sequelize.DATEONLY,
    },
    tipoRejeito: {
        type: Sequelize.STRING(32),
    },
    status: {
        type: Sequelize.STRING(32),
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: "users",
            key: "id",
        },
    },
});


SolicitarColeta.belongsTo(
    User, { foreignKey: "userId" 
    }); //Uma solicitação pertence a um usuário.
User.hasMany(
    SolicitarColeta, { foreignKey: "userId" 
}); //Um usuário pode ter várias solicitações.

sequelize
    .sync({ force: false })
    .then(() => console.log("Tabela SolicitarColeta iniciada!"))
    .catch((error) => console.log("Erro ao iniciar a tabela SolicitarColeta.", error));

module.exports = SolicitarColeta;