const jwt = require("jsonwebtoken");

function authLogin(req,res,next){
    const authHeader = req.headers['authorization'];

    const accesstoken = authHeader && authHeader.split(" ")[1];

    if(!accesstoken)
        return res.status(400).json({message:"Access token is tampered"});

    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err,data)=>{
        if(err) return res.status(403).json({message: "Unauthorized to access"});

        req.user = data.user;
        next();
    })
}

module.exports = {authLogin}