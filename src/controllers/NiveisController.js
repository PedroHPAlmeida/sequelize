const db = require("../models");

class NiveisController {

    static async buscarNiveis(req, res) {
        try {
            const niveis = await db.Niveis.findAll();
            res.status(200).json(niveis);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async buscarNivelPorId(req, res) {
        try {
            const id = Number(req.params.id);
            const nivel = await db.Niveis.findByPk(id);
            res.status(200).json(nivel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async salvarNivel(req, res) {
        try {
            const body = req.body;
            const nivel = await db.Niveis.create(body);
            res.status(201).json(nivel);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async alterarPorId(req, res) {
        try {
            const id = Number(req.params.id);
            const nivel = req.body;
            await db.Niveis.update(nivel, { where: { id: id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deletarPorId(req, res) {
        try {
            const id = Number(req.params.id);
            await db.Niveis.destroy({ where: { id: id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = NiveisController;
