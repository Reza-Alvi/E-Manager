const { signup, login, getProfile, updateProfile, forgotPassword, resetPassword, refreshAccessToken } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const ensureAuthenticated = require('../Middlewares/Auth');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/refresh-token', refreshAccessToken);
router.get('/profile', ensureAuthenticated, getProfile);
router.put('/profile', ensureAuthenticated, updateProfile);
router.put('/profile-details', ensureAuthenticated, upload.single('profilePicture'), updateProfile);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
