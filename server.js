//Applikation för registrering och inloggning

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app=express();
const port=process.env.PORT||3000;

app.use(bodyParser.json());

//Route

app.use("/api", authRoutes);

//Skyddad route 

app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({message: "Skyddad route."})
})

//funktion för att validera token

function authenticateToken(req, res, next) {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if(token==null) res.status(401).json({message: "Ingen tillgång till denna route - token saknas."});

jwt.verify(token, process.env.JWT_SECRET_KEY, (error, username) => {
    if(error) return res.status(403).json({message: "Ogiltig JWT."});
    req.username=username;
    next();
})
}

//Starta applikation

app.listen(port, () => {
    console.log("Server igång på port: " +port)
})

