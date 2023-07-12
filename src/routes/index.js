const bodyParser = require("body-parser");
const pessoas = require("./pessoasRoutes");
const niveis = require("./niveisRoutes");

module.exports = app => {
    app.use(bodyParser.json());
    app.use(pessoas);
    app.use(niveis);
}
