const db = require("../models");

class TurmasController {

    static async buscarTurmas(req, res) {
        try {
            const turmas = await db.Turmas.findAll();
            res.status(200).json(turmas);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async buscarTurmaPorId(req, res) {
        try {
            const id = Number(req.params.id);
            const turma = await db.Turmas.findByPk(id);
            res.status(200).json(turma);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async salvarTurma(req, res) {
        try {
            const body = req.body;
            const turma = await db.Turmas.create(body);
            res.status(201).json(turma);
        } catch (error) {
            res.status(500).json({ message: message.error });
        }
    }

    static async alterarTurmaPorId(req, res) {
        try {
            const id = Number(req.params.id);
            const turma = req.body;
            await db.Turmas.update(turma, { where: { id: id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deletarPorId(req, res) {
        try {
            const id = Number(req.params.id);
            await db.Turmas.destroy({ where: { id: id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = TurmasController;
