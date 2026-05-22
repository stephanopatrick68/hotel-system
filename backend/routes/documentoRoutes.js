const express = require("express");

const router = express.Router();

const {
  consultarDocumento
} = require("../controllers/documentoController");

router.get(
  "/documento/:numero",
  consultarDocumento
);

module.exports = router;