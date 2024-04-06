const mongoose = require('mongoose');

const { loggerDev } = require("../lib/logger");

const { mongo_db } = require('../config/config');

(async () => {

    try {

        const connection = await mongoose.connect(`${mongo_db}`)

        if(connection.STATES.connected) {
            loggerDev.info("Base de datos funcionando")
        }
        
    } catch (error) {
        loggerDev.error(error)
    }

})()