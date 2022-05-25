const express = require('express');
const router = express.Router();

const Product = require('../controllers/products.controllers')
const middleware = require('../middleware/user.middleware')

router.post('/add-product', Product.create)
router.get('/products', Product.getProducts)
router.get('/products-new', Product.getNewProducts)
router.post('/products-img', Product.getProductImages)
router.post('/search', Product.search)
router.get('/get-product-types', Product.getProductTypes)

// router.get('/test', (req, res) => {
//     res.status(200).send({
//         message: 'test'
//     })
// })
module.exports = router;