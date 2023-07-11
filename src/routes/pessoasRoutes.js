const { Router } = require("express");
const PessoasController = require("../controllers/PessoaController");

const router = Router();

router
    .get("/pessoas", PessoasController.pegaTodasPessoas)
    .get("/pessoas/:id", PessoasController.pegarPessoaPorId)
    .post("/pessoas", PessoasController.salvarPessoa)
    .put("/pessoas/:id", PessoasController.atualizarPessoaPorId)
    .delete("/pessoas/:id", PessoasController.deletarPessoaPorId);

module.exports = router;
