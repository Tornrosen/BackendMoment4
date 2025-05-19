const express=require("express");
const router=express.Router();
require("dotenv").config();
const authenticateToken = require("../middleware/authenticateToken.js")
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.DATABASE_MESSAGES);

//Lägga till meddelande

router.post("/messages", authenticateToken, async (req, res) => {
    try {
        const { username, message } = req.body;
        //Validera input
        if(username.length<5||message.length<5){
            return res.status(400).json({error: "Fyll i alla uppgifter med minst fem tecken!"})
        }
        //Om korrekt, spara meddelande
        const sql = "INSERT INTO messages(username, message) VALUES (?, ?);";
        db.run(sql, [username, message], (error) => {
            if (error) {
                res.status(400).json({message: "Fel när meddelande skulle skapas."})
            } else {
                res.status(201).json ({message: "Meddelande skapat."})
            }

        });
    }catch (error){
        res.status(500).json({error: "Serverfel"});
    }
});

//Hämta meddelanden

router.get("/messages", async (req, res) => {
try {
    const messages = "SELECT * FROM messages";
    res.status(200).json(messages);

}
catch (error){
    res.status(500).json ({message: error.message});
}
})

module.exports = router;