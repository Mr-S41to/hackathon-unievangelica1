const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const UserController = require("./src/controllers/UserController");
const AuthController = require("./src/controllers/AuthController");
const VeiculoController = require("./src/controllers/VeiculosController");
const SolicitarColetaController = require("./src/controllers/SolicitarColetaController");
const PontoColetaController = require("./src/controllers/PontoColetaController");
const RotaController = require("./src/controllers/RotasController")

const { AuthenticateToken } = require("./src/middlewares/AuthMiddleware");

// Configuração de armazenamento do Middleware.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const signature = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return callback(null, true);
    }
    callback(new Error("Formatos incompatíveis."));
  },
}).single("signature");

// Rotas
router
  .route("/newuser")
  .post(signature, (req, res) => UserController.save(req, res));

// Auth
router
  .route("/login")
  .post(AuthController.login)

// router
//   .route("/users")
//   .get(AuthenticateToken, (req, res) => UserController.list(req, res));

router
  .route("/user/:id")
  .get(AuthenticateToken, (req, res) => UserController.getOne(req, res))
  .put(AuthenticateToken, signature, (req, res) => UserController.update(req, res));

router
  .route("/veiculos")
  .post(AuthenticateToken, (req, res) => VeiculoController.save(req, res));

router
  .route("/veiculos/:userId")
  .get(AuthenticateToken, (req, res) => VeiculoController.getByUserId(req, res));

router
  .route("solicitar-coleta")
  .post(AuthenticateToken, (req, res) => SolicitarColetaController.save(req, res))
  .get(AuthenticateToken, (req, res) => SolicitarColetaController.list(req, res));

router
  .route("/solicitar-coleta/:id")
  .put(AuthenticateToken, (req, res) => SolicitarColetaController.update(req, res));

router
  .route("/ponto-coleta")
  .post(AuthenticateToken, (req, res) => PontoColetaController.save(req, res))
  .get(AuthenticateToken, (req, res) => PontoColetaController.list(req, res));

router
  .route("/rota")
  .post(AuthenticateToken, (req, res) => RotaController.save(req, res))
  .get(AuthenticateToken, (req, res) => RotaController.list(req, res));

module.exports = router;
