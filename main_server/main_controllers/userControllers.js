const User = require('../../models/user')
const bcrypt = require("bcryptjs")

exports.allUserDetails = async (req, res) => {
    try {
        const users = await User.find().select('-cart -__v -_id');
        if (!users)
            return res.status(404).json({ message: "Something unexpected is requested" })
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

exports.createUser = async (req, res) => {
    try {
        const { username, email, phoneNo, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({username, email, phoneNo, password:hashedPassword, role:"merchant"});
        const result = await user.save();
        res.status(201).json({ message: "New user created successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.userDetailById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-cart -__v -_id');
        if (!user)
            return res.status(404).json({ message: "Requested user doesn't exist" });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.deleteUserById = async (req, res) => {
    try {
        const userId = await User.findById(req.params.id);
        if (!userId)
            return res.status(404).json({ message: "Requested user doesn't exist" });
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { username, email, phoneNo } = req.body;
        const userId = await User.findById(req.params.id);
        
        if (!userId)
            return res.status(404).json({ message: "Requested user doesn't exist" });

        const user = await User.findByIdAndUpdate({ _id: req.params.id }, { username: username, email: email, phoneNo: phoneNo }, { new: true });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}