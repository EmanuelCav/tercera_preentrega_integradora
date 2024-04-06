const jwt = require('jsonwebtoken')

const { jwt_key, jwt_email_key } = require('../config/config')

const generateToken = (id, role, email) => {
    return jwt.sign({ id, role, email }, `${jwt_key}`, {
        expiresIn: '7d'
    })
}

const linkToken = (email) => {
    return jwt.sign({ email }, `${jwt_email_key}`, {
        expiresIn: '1h'
    })
}

module.exports = {
    generateToken,
    linkToken
}