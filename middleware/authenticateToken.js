const jwt = require("jsonwebtoken");

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

module.exports = authenticateToken;