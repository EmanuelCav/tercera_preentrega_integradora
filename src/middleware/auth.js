const jwt = require('jsonwebtoken');

const { jwt_key, jwt_email_key } = require('../config/config');
const { statusMessage } = require('../helper/statusMessage');
const { forgotPasswordEmail } = require('../helper/message');

const auth = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_key}`)

    if (!verification) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token is not valid" })
    }

    req.user = verification

    next()

}

const admin = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_key}`)

    if (!verification) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token is not valid" })
    }

    req.user = verification

    if (req.user.role !== 'admin') {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "You must be admin" })
    }

    next()

}

const emailAuth = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        await forgotPasswordEmail(req.body.email)
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_email_key}`)

    if (!verification) {
        await forgotPasswordEmail(req.body.email)
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token is not valid" })
    }

    next()

}

const premium = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token does not exists" })
    }

    const verification = jwt.verify(token, `${jwt_key}`)

    if (!verification) {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "Token is not valid" })
    }

    req.user = verification

    if (req.user.role !== 'admin' || req.user.role !== 'premium') {
        return res.status(statusMessage.UNAUTHORIZED).json({ message: "You must be admin or premium" })
    }

    next()

}

module.exports = {
    admin,
    auth,
    emailAuth,
    premium
}