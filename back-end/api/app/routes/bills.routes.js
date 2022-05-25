const express = require('express');
const router = express.Router();

const Bill = require('../controllers/bills.controllers')
const middleware = require('../middleware/user.middleware')

router.post('/bill', middleware.isLogged, Bill.create)
router.post('/update-bill', middleware.isLogged, Bill.update)
router.get('/total-bill', middleware.isLogged, Bill.getTotalBill)
router.post('/delete-bill', middleware.isLogged, Bill.deleteBill)
router.post('/detail-bills', middleware.isLogged, Bill.getBillDetails)

module.exports = router;