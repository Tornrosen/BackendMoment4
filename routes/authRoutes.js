//Routes för autentisering

const express = require("express");
const router = express.Router();

//Registrera användare
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //Validera input
        if(username.length>5||email.length>5||password.length){
            return res.status(400).json({error: "Fyll i alla uppgifter med minst fem tecken!"})
        }
        //Om korrekt, spara användare
        res.status(201).json ({message: "Användare skapad."})
    }catch (error){
        res.status(500).json({error: "Serverfel"});
    }
});

//Logga in användare
router.post("/login", async (req, res) => {
    try { 
        const { username, password } = req.body;
        //Validera input
        if(username.length>5||password.length){
            return res.status(400).json({error: "Fyll i användarnamn och lösenord!"})
        }
        //Kolla att inloggningsuppgifterna stämmer
        if(username==="Ankan"&&password==="password") {
            res.status(200).json({message: "Loggar in användare..."})
        } else {
            res.status(401).json({error: "Ange korrekt lösenord och användarnamn."})
        }

    } catch (error){
        res.status(500).json({error: "Serverfel"});
    }
})

module.exports = router;