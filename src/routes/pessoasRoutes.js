const { Router } = require("express");
const PessoasController = require("../controllers/PessoaController");

const router = Router();

router
    .get("/pessoas", PessoasController.pegaTodasPessoas)
    .get("/pessoas/ativo", PessoasController.pegaTodasPessoasAtivas)
    .get("/pessoas/:id", PessoasController.pegarPessoaPorId)
    .post("/pessoas", PessoasController.salvarPessoa)
    .put("/pessoas/:id", PessoasController.atualizarPessoaPorId)
    .delete("/pessoas/:id", PessoasController.deletarPessoaPorId)
    .get("/pessoas/:estudanteId/matricula/:matriculaId", PessoasController.pegarUmaMatricula)
    .post("/pessoas/:estudanteId/matricula", PessoasController.criarMatricula)
    .put("/pessoas/:estudanteId/matricula/:matriculaId", PessoasController.atualizarMatricula)
    .delete("/pessoas/:estudanteId/matricula/:matriculaId", PessoasController.deletarMatricula)
    .post("/pessoas/:id/restaura", PessoasController.restauraPessoa);

module.exports = router;
