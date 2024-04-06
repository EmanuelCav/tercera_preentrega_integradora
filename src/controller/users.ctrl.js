const passport = require('passport');

const MongoUserManager = require('../dao/MongoUserManager');

const CustomErrors = require('../lib/errors');

const { statusMessage, nameMessage } = require('../helper/statusMessage');
const { linkToken } = require('../helper/token');

const userManager = new MongoUserManager()

const users = async (req, res) => {

    try {

        const result = await userManager.getUsers()

        return res.status(statusMessage.OK).json(result)

    } catch (error) {
        req.logger.error(error.message)
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const forgotPassword = async (req, res) => {

    const { email } = req.body

    try {

        const result = await userManager.passwordForgot(email)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "User does not exists", statusMessage.BAD_REQUEST)
        }

        const token = linkToken(email)

        return res.status(statusMessage.OK).json({ 
            message: "Check your email",
            token
        })

    } catch (error) {
        req.logger.error(error.message)
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const recoverPassword = async (req, res) => {

    const { email } = req.params
    const { password } = req.body

    try {

        const result = await userManager.passwordRecover(email, password)

        if (!result) {
            CustomErrors.generateError(nameMessage.BAD_REQUEST, "User does not exists or password is not avaible", statusMessage.BAD_REQUEST)
        }

        return res.status(statusMessage.OK).json({ 
            message: "Password updated successfully",
            user: result
        })

    } catch (error) {
        req.logger.error(error.message)
        CustomErrors.generateError(nameMessage.INTERNAL_SERVER_ERROR, error.message, statusMessage.INTERNAL_SERVER_ERROR)
    }

}

const login = passport.authenticate('login', {
    failureRedirect: '/login',
    successRedirect: '/products',
    successFlash: true,
    failureFlash: true,
    session: false
})

const register = passport.authenticate('register', {
    failureRedirect: '/register',
    successRedirect: '/products',
    successFlash: true,
    failureFlash: true,
    session: false
})

module.exports = {
    users,
    login,
    register,
    forgotPassword,
    recoverPassword
}