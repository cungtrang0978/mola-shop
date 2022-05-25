const express = require('express');
const router = express.Router();

const Rate = require('../controllers/rate.controller')
const middleware = require('../middleware/user.middleware')

router.post('/add-rate',middleware.isLogged, Rate.addRate)
router.post('/product-rate', Rate.getProductRate)
router.post('/update-rate', middleware.isLogged, Rate.updateRate)

module.exports = router;