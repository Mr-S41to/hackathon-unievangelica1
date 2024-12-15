const Sequelize = require("sequelize");
const sequelize = require("../config/db");
//Algoritimo de senhas.
const bcrypt = require("bcrypt");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  login: {
    type: Sequelize.STRING(32),
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,  //Para acomodar o hash bcrypt
    allowNull: false,
  },
  tipo: {
    type: Sequelize.STRING(32),
  },
  nome: {
    type: Sequelize.STRING(128),
  },
  cpfCnpj: {
    type: Sequelize.STRING(32),
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
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

sequelize
  .sync({ force: false })
  .then(() => console.log("Tabela User iniciada!"))
  .catch((error) => console.log("Erro ao iniciar a tabela User.", error));

module.exports = User;