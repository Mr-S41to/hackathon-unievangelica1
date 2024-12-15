const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Veiculos = sequelize.define("veiculos", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    placa: {
        type: Sequelize.STRING(32),
    },
    tipo: {
        type: Sequelize.STRING(32),
    },
    numero: {
        type: Sequelize.STRING(5),
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
});

Veiculos.belongsTo(
    User, { foreignKey: "userId" 
    }); //Um veículo pertence a um usuário.
User.hasMany(
    Veiculos, { foreignKey: "userId" 
}); //Um usuário pode ter vários veículos.

sequelize
    .sync({ force: false })
    .then(() => console.log("Tabela Veiculos iniciada!"))
    .catch((error) => console.log("Erro ao iniciar a tabela Veiculos.", error));

module.exports = Veiculos;