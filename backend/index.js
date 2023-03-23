
var express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

var app = express();

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    app.use(express.static("../frontend"));
    res.render(path.join(__dirname, "../frontend", "/contributor"));
});

app.listen(3000, () => {
    console.log("Server listening on port " + 3000);
});
