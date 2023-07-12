const { Router } = require("express");
const TurmasController = require("../controllers/TurmasController");

const router = Router();

router
    .post("/turmas", TurmasController.salvarTurma)
    .get("/turmas", TurmasController.buscarTurmas)
    .get("/turmas/:id", TurmasController.buscarTurmaPorId)
    .put("/turmas/:id", TurmasController.alterarTurmaPorId)
    .delete("/turmas/:id", TurmasController.deletarPorId);

module.exports = router;
