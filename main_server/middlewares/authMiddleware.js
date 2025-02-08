const jwt = require("jsonwebtoken");
const User = require("../main_model/user");

function authLogin(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    const accesstoken = authHeader && authHeader.split(" ")[1];
    
    if (!accesstoken)
        return res.status(400).json({ message: "Access token is tampered" });
    
    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) return res.status(403).json({ message: "Unauthorized to access" });

        const userData = await User.findById(data.user._id).select("-__v")
        req.user = userData;
        next(); 
    })
}

function adminRoleValidation(req,res,next) {
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "You are unauthorised to interact with this information" })
    next();
}

function adminMerchantValidation(req,res,next) {
    console.log(req.user.role)
    if (!(req.user.role !== "admin" || req.user.role !=="merchant"))
        return res.status(403).json({ message: "You are unauthorised to interact with this information" })
    next();
}

function merchantRoleValidation(req,res,next) {
    if (req.user.role !== "merchant")
        return res.status(403).json({ message: "You are unauthorised to interact with this information" })
    next();
}

module.exports = { authLogin,adminRoleValidation,adminMerchantValidation,merchantRoleValidation  }