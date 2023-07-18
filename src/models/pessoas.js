'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pessoas.hasMany(models.Turmas, { foreignKey: "docente_id" });
      Pessoas.hasMany(models.Matriculas, { foreignKey: "estudante_id" });
    }
  }
  Pessoas.init({
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "E-mail inválido"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      todos: { where: {} }
    },
    validate: {
      nomeValido() {
        const nome = this.nome.trim();
        if (this.nome.length < 3) {
          throw new Error("Nome inválido")
        }
      }
    }
  });
  return Pessoas;
};