const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1h' });
};

const signup = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, phoneNumber, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists, you can login', success: false });
        }
        const userModel = new UserModel({ firstName, lastName, dateOfBirth, gender, phoneNumber, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: 'Signup successfully', success: true });
    } catch (err) {
        console.error('Signup error:', err);
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
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(200).json({ message: 'Login Success', success: true, accessToken, refreshToken, email, name: user.name });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const refreshAccessToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            console.error('Refresh token error:', err);
            return res.sendStatus(401);
        }
        const newAccessToken = generateAccessToken({ email: user.email, _id: user._id });
        res.json({ accessToken: newAccessToken });
    });
};

const getProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, gender, phoneNumber, email, password } = req.body;
        const updateUser = { firstName, lastName, dateOfBirth, gender, phoneNumber, email };
        
        if (password) {
            updateUser.password = await bcrypt.hash(password, 10);
        }

        
        if (req.file) {
            
            const profilePicture = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            updateUser.profilePicture = profilePicture;
        }

        const user = await UserModel.findByIdAndUpdate(req.user._id, updateUser, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const generateResetToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No account with that email address exists.', success: false });
        }

        
        const resetPasswordToken = generateResetToken();
        const resetPasswordExpires = Date.now() + 3600000;

        
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        
        const resetUrl = `https://e-manager-ui.vercel.app/reset-password/${resetPasswordToken}`;
        const mailOptions = {
            to: user.email,
            from: {
                name: 'E-Manager',
                address: process.env.EMAIL_USER,
            },
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   ${resetUrl}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent.', success: true });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.', success: false });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been reset.', success: true });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = {
    signup,
    login,
    getProfile,
    updateProfile,
    forgotPassword,
    resetPassword,
    refreshAccessToken,
};