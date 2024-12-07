const User = require("../models/User");

exports.list = async (_, res) => {
  try {
    const users = await User.findAll({
      order: [["id", "DESC"]],
    });

    if (!users || users.length === 0) {
      return res.status(404).send({ message: "Nenhum usuário encontrado!" });
    }

    const usersWithoutPassword = users.map((user) => {
      const {  password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword;
    });

    res.send(usersWithoutPassword);
    console.log(usersWithoutPassword);
  } catch (error) {
    console.error("Erro ao procurar usuários:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.save = async (req, res) => {
  console.log("Dados recebidos no corpo da requisição:", req.body);
  console.log("Arquivo recebido:", req.file);
  const { 
    id, 
    login,  
    password,
    nome,
    tipo,
    cpfCnpj,
    coords
   } = req.body;

  let signature = null;
  if (req.file) {
    signature = req.file.path;
  } else {
    console.log("Nenhum arquivo foi enviado.");
  }

  User.create({
    id,
    login,
    password,
    nome,
    tipo,
    cpfCnpj,
    coords
  })
    .then((post) => {
      console.log("Usuário criado com sucesso:", post);
      res.send(post);
    })
    .catch((error) => {
      console.error("Erro ao salvar novo usuário:", error);
      res.status(500).send("Internal Server Error");
    });
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).sent({
        message: "Usuário não encontrado!",
      });
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error!",
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { 
    login,
    password,
    nome,
    tipo,
    cpfCnpj,
    coords
   } = req.body;
  const signature = req.file ? req.file.path : null;

  try {
    const [updated] = await User.update({
        id,
        login,
        password,
        nome,
        tipo,
        cpfCnpj,
        coords
      },
      { where: { id } }
    );

    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: "Usuário não encontrado para atualização!" });
    }
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).send("Internal Server Error");
  }
};
