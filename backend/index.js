const express = require("express");
const ejs=require('ejs');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require('dotenv');
var app = express();
dotenv.config({ path: './config.env' });
require('./db/connection');
var TMClient = require('textmagic-rest-client');

//const register = require("./model/patient");
//app.use(require('./router/auth'));
//const User = require('./model/patient');
// for hotel schema
//const Hotel = require('./model/contributor');
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

TWILIO_ACCOUNT_SID = "AC767517aeca2be00365e5ccf94783c392"
TWILIO_AUTH_TOKEN = "e86b61cf367a3446ed9ef8c3db88f1e7"
TWILIO_SERVICE_SID = "VAd7f66546099e43f7d46310b5c2bdd997"

const client=require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)



// for twilio
//app.use(jsonParser);
//const twilioRouter = require('./src/routes/twilio-sms');
//const { Client } = require("twilio/lib/twiml/VoiceResponse");
//app.use('/twilio-sms',twilioRouter);


// const userSchema = new mongoose.Schema({
//     users: Number,
// });

// const OTP = mongoose.model("OTP",userSchema);


// for otp
var randomN=123456;

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
app.post("/verify",function(req,res){
    res.render("verify");
})

app.post("/verifyotp",function(req,res){
    const code=Number(req.body.otp);
    console.log(randomN);
    console.log(code);
    if(randomN===code){
         app.use(express.static("../frontend"));
    res.render(path.join(__dirname, "../frontend", "/contributor-category"));
    }else{
        app.use(express.static("../frontend"));
        res.render(path.join(__dirname, "../frontend", "/contributor-signup"));
    }
    
})

app.post("/signupcon", (req, res) => {
    const contact=req.body.phone;
    randomN=Math.floor(Math.random() * 90000)+10000;

    
    // var c = new TMClient('username', 'C7XDKZOQZo6HvhJwtUw0MBcslfqwtp4');
    // c.Messages.send({text: 'test message', phones:'+917535895785'}, function(err, res){
    //     console.log('Messages.send()', err, res);
    // });

    client.messages.create({body:randomN, from:'+14754051584',to:"+91"+contact}).then(message=>console.log(message.sid)).catch((err)=>{console.log(err)});
 console.log("ha bhai");
    app.use(express.static("../frontend"));
    res.render(path.join(__dirname, "../frontend", "/verify"));





   
    //app.use(express.static("../frontend"));
    //res.render(path.join(__dirname, "../frontend", "/contributor-signup"));
});

app.get("/cat-contributor", (req, res) => {
    app.use(express.static("../frontend"));
    res.render(path.join(__dirname, "../frontend", "/contributor-category"));
});


app.post("/contributor-home",function(req,res){
    const cat=req.body.attlist;
    console.log(req.body);
    app.use(express.static("../frontend"));
    res.render(path.join(__dirname, "../frontend", "/contributor-home"),{cat:cat});
})

app.listen(3000, () => {
    console.log("Server listening on port " + 3000);
});
