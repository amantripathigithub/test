
var express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require('dotenv');
var app = express();
dotenv.config({ path: './config.env' });
require('./db/connection');

app.set("view engine", "ejs");
//const register = require("./model/patient");
//app.use(require('./router/auth'));
//const User = require('./model/patient');
// for hotel schema
//const Hotel = require('./model/contributor');


app.get("/", (req, res) => {
    app.use(express.static("../frontend"));
    res.render(path.join(__dirname, "../frontend", "/contributor"));
});


app.get("/logincon", (req, res) => {
    app.use(express.static("../frontend"));
    res.render(path.join(__dirname, "../frontend", "/contributor-login"));
});

app.get("/signupcon", (req, res) => {
    app.use(express.static("../frontend"));
    res.render(path.join(__dirname, "../frontend", "/contributor-signup"));
});

app.get("/cat-contributor", (req, res) => {
    app.use(express.static("../frontend"));
    res.render(path.join(__dirname, "../frontend", "/contributor-category"));
});

app.listen(3000, () => {
    console.log("Server listening on port " + 3000);
});
