require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const secretKey = process.env.SECRET_KEY;

async function login(req, res) {
  const {
    login,
    password
  } = req.body;
  console.log("Dados recebidos na requisição:", {
    login,
    password
  });

  if (!login || !password) {
    return res.status(400).json({ error: "Login e senha são obrigatórios" });
  }

  try {
    const user = await User.findOne({ where: { login } });

    if (!user) {
      console.log("Usuário não encontrado:", login);
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    if (user.status !== "Ativo") {
      console.log("Usuário com status inativo:", user.status);
      return res.status(403).json({ message: 'Usuário não está ativo' });
    }

    console.log("Hash armazenado no banco de dados:", user.password);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log(
        "Senha incorreta para o usuário:",
        login,
        password,
        passwordMatch
      );
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign({ id: user.id }, secretKey);

    res.json({ token, user });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { login };
