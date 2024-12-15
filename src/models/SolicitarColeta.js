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
    coords: {
        type: Sequelize.JSON, //Armazena o array como JSON.
        allowNull: true,
        validate: {
          isValidCoordinates(value) {
            if (!Array.isArray(value) || value.length !== 2) {
              throw new Error("Coordinates devem ser um array com dois números [lat, long].");
            }
            const [lat, long] = value;
            if (typeof lat !== "number" || typeof long !== "number") {
              throw new Error("Latitude e longitude devem ser números.");
            }
            if (lat < -90 || lat > 90) {
              throw new Error("Latitude deve estar entre -90 e 90.");
            }
            if (long < -180 || long > 180) {
              throw new Error("Longitude deve estar entre -180 e 180.");
            }
          },
        },
      },
    data: {
        type: Sequelize.DATE,
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