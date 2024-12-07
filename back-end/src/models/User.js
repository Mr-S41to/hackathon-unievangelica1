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