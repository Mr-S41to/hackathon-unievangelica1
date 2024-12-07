const Sequelize = require("sequelize");
//Conexão com banco de dados gerenciadaspelo ORM.
const sequelize = new Sequelize("hackathon", "root", "120924", {
  dialect: "mysql",
  host: "localhost", //Mudar para localhost durante desenvolvimento.
  port: 3306,
});

module.exports = sequelize;
