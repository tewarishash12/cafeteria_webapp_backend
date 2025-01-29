const jwt = require("jsonwebtoken");

function authLogin(req, res, next) {
    const authHeader = req.headers['authorization'];

    const accesstoken = authHeader && authHeader.split(" ")[1];

    if (!accesstoken)
        return res.status(400).json({ message: "Access token is tampered" });

    jwt.verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return res.status(403).json({ message: "Unauthorized to access" });

        req.user = data.user;
        next();
    })
}

function adminRoleValidation() {
    if (req.user.role !== "admin")
        return res.status(400).json({ message: "You are unauthorised to access this page" })
    next();
}

function merchantRoleValidation() {
    if (req.user.role !== "merchant")
        return res.status(400).json({ message: "You are unauthorised to access this page" })
    next();
}

module.exports = { authLogin,adminRoleValidation,merchantRoleValidation  }