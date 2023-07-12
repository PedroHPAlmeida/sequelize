const { Router } = require("express");
const NiveisController = require("../controllers/NiveisController");

const router = Router();

router
    .post("/niveis", NiveisController.salvarNivel)
    .get("/niveis", NiveisController.buscarNiveis)
    .get("/niveis/:id", NiveisController.buscarNivelPorId)
    .put("/niveis/:id", NiveisController.alterarPorId)
    .delete("/niveis/:id", NiveisController.deletarPorId);

module.exports = router;
