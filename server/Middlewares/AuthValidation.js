const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(100).required(),
        lastName: Joi.string().min(3).max(100).required(),
        dateOfBirth: Joi.date().required(),
        gender: Joi.string().valid('male', 'female').required(),
        phoneNumber: Joi.string().min(10).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(100).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad request", error })
    }
    next();
}
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
module.exports = {
    signupValidation,
    loginValidation
}