const PORT = 5000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express()

app.use(bodyParser.json());
app.use(cors());

module.exports = {
    PORT,
    bodyParser,
    cors,
    fs,
    app,
    express
}