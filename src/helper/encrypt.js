const bcryptjs = require('bcryptjs')

const hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(8)
    return await bcryptjs.hash(password, salt)
}

const comparePassword = async (password, hash) => {
    return await bcryptjs.compare(password, hash)
}

module.exports = {
    hashPassword,
    comparePassword
}