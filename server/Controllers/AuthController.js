const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: 'Signup successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed, email or password is wrong';
        if (!user) {
            return res.status(401).json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).json({ message: 'Login Success', success: true, jwtToken, email, name: user.name });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updateUser = { name, email };
        if (password) {
            updateUser.password = await bcrypt.hash(password, 10);
        }
        const user = await UserModel.findByIdAndUpdate(req.user._id, updateUser, { new: true });
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    signup,
    login,
    getProfile,
    updateProfile
};
