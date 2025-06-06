//Applikation för registrering och inloggning

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");

require("dotenv").config();

const app=express();
const port=process.env.PORT||3000;

app.use(bodyParser.json());
app.use(cors());

//Route

app.use("/", authRoutes);
app.use("/", messageRoutes);

//Starta applikation

app.listen(port, () => {
    console.log("Server igång på port: " +port)
})

