const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const UserController = require("./src/controllers/UserController");
const AuthController = require("./src/controllers/AuthController");
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

router
  .route("/users")
  .get(AuthenticateToken, (req, res) => UserController.list(req, res));

router
  .route("/user/:id")
  .get(AuthenticateToken, (req, res) => UserController.getOne(req, res))
  .put(AuthenticateToken, signature, (req, res) => UserController.update(req, res));

module.exports = router;
