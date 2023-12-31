const db = require("../models");
const Sequelize = require("sequelize");

class PessoaController {

    static async pegaTodasPessoas(req, res) {
        try {
            const pessoas = await db.Pessoas.scope('todos').findAll();
            res.status(200).json(pessoas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async pegaTodasPessoasAtivas(req, res) {
        try {
            const pessoas = await db.Pessoas.findAll();
            res.status(200).json(pessoas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async pegarPessoaPorId(req, res) {
        try {
            const id = Number(req.params.id);
            const pessoa = await db.Pessoas.findByPk(id);
            res.status(200).json(pessoa);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async salvarPessoa(req, res) {
        try {
            const body = req.body;
            const pessoa  = await db.Pessoas.create(body);
            res.status(201).json(pessoa);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async criarMatricula(req, res) {
        try {
            const estudanteId = Number(req.params.estudanteId);
            const body = { ...req.body, estudante_id: estudanteId };
            const matricula  = await db.Matriculas.create(body);
            res.status(201).json(matricula);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async pegarUmaMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params;
            const matricula = await db.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            res.status(200).json(matricula);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } 

    static async atualizarMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params;
            const matricula = req.body;
            await db.Matriculas.update(matricula, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static async deletarMatricula(req, res) {
        try {
            const { estudanteId, matriculaId } = req.params;
            await db.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async atualizarPessoaPorId(req, res) {
        try {
            const id = Number(req.params.id);
            const pessoa = req.body;
            await db.Pessoas.update(pessoa, { where: { id: id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async deletarPessoaPorId(req, res) {
        try {
            const id = Number(req.params.id);
            await db.Pessoas.destroy({ where: { id: id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    static async restauraPessoa(req, res) {
        try {
            const id = Number(req.params.id);
            await db.Pessoas.restore({ where: { id: id } });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    
    static async pegaMatriculas(req, res) {
        try {
            const id = Number(req.params.estudanteId);
            const pessoa = await db.Pessoas.findOne({ where: { id: id } });
            const matriculas = await pessoa.getAulasMatriculadas();
            res.status(200).json(matriculas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        try {
            const turmaId = Number(req.params.turmaId);
            const matriculas = await db.Matriculas.findAndCountAll({
                where: {
                    turma_id: turmaId,
                    status: "confirmado"
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            });
            res.status(200).json(matriculas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2;
        try {
            const matriculas = await db.Matriculas.findAndCountAll({
                where: {
                    status: "confirmado"
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            });
            res.status(200).json(matriculas.count);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params;
        console.log(estudanteId);
        try {
            db.sequelize.transaction(async t => {
                await db.Pessoas.update({ ativo: false }, {
                    where: { id: Number(estudanteId) },
                    validate: false
                }, { transaction: t });
                await db.Matriculas.update({ status: "cancelado" }, {
                    where: { estudante_id: Number(estudanteId) }
                }, { transaction: t });
                res.status(204).send();
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = PessoaController;
