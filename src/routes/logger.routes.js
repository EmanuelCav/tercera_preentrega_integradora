const { Router } = require('express');

const router = Router()

router.get('/api/loggerTest', (req, res) => {

    try {
        req.logger.debug("Debug")
        req.logger.http("Http")
        req.logger.info("Info")
        req.logger.warning("Warning")
        req.logger.fatal("Fatal")
    } catch (error) {
        req.logger.error(error.message)
    }
})

module.exports = router

