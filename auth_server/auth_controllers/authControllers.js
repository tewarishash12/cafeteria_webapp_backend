const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
    try {
        const { username, email, phoneNo, password, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({ username, email, phoneNo, password: hashedPassword, role });
        const result = await user.save();
        res.status(201).json({ message: "New user created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userInfo = await User.findOne({username}).select("-_id -__v")

        if(!userInfo)
            return res.status(404).json({message:"User with requested username not found"});
        
        const validation = await bcrypt.compare(password, userInfo.password)
        console.log(validation);
        
        if(!validation)
            return res.status(401).json({message:"Password entered do not match"});
        
        const user = {username:userInfo.username, email:userInfo.email, phoneNo: userInfo.phoneNo}
        const token = jwt.sign(user, process.env.TOKEN_SECRET);
        
        res.status(201).json({ message: "User logged in successfully", token:token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}