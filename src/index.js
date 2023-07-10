const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());


app.get("/test", (req, res) => res.status(200).json({ message: "UP" }));

const port = 3000;
app.listen(port, () => console.log(`Servidor executando na porta ${port}`));

module.exports = app;
