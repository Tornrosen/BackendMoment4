//Applikation för registrering och inloggning

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app=express();
const port=process.env.PORT||3000;

app.use(bodyParser.json);

//Starta applikation

app.listen(port, () => {
    console.log("Server igång på port: " +port)
})