//Imports Dependencias
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//Import de arquivos.
const routes = require("./routes");

//Definições
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Default Acess");
});

const server = app.listen(port, () => {
  const address = server.address();
  const host = address.address === '::' ? 'localhost' : address.address;
  console.log(`Servidor rodando em http://${host}:${port}`);
})