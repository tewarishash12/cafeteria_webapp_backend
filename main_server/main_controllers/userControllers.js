const User = require('../main_model/user')
const bcrypt = require("bcryptjs")

exports.allUserDetails = async (req, res) => {
    try {
        const users = await User.find().select('-cart -__v');
        if (!users)
            return res.status(404).json({ message: "Something unexpected is requested" })
        res.status(201).json({users});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        const { username, email, phoneNo, password, role = "merchant" } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({ username, email, phoneNo, password: hashedPassword, role });
        const result = await user.save();
        res.status(201).json({ message: "New user created successfully" });
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

exports.updateRole = async (req, res) => {
    try {
        const { role } = req.body;
        const userId = await User.findById(req.params.id);

        if (!userId)
            return res.status(404).json({ message: "Requested user doesn't exist" });

        await User.findByIdAndUpdate({ _id: req.params.id }, { role: role }, { new: true });
        res.status(201).json({message: "User has been updated"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateUserInfo = async (req, res) => {
    try {
        const { username, email, phoneNo } = req.body;
        const userId = await User.findById(req.params.id);
        
        if (!userId)
            return res.status(404).json({ message: "Requested user doesn't exist" });
        
        await User.findByIdAndUpdate({ _id: req.params.id }, { username: username, email: email, phoneNo: phoneNo }, { new: true });
        const updatedUser = await User.findById(req.params.id);
        res.status(201).json({message: "User has been updated", user: updatedUser});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.me = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password -__v").populate("cart.item");
        res.status(201).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}