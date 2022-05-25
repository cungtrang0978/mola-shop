const sql = require('./db')

//Constructor
const Product = function(product) {
    this.id_product = product.id_product,
    this.product_name = product.product_name,
    this.price = product.price,
    this.product_type = product.product_type,
    this.desciption = product.desciption,
    this.specifications = product.specifications,
    this.addedDate = product.addedDate
}

//Add product
Product.create = (newProduct, result) => {
    sql.query('INSERT INTO Products SET ?', newProduct, (err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        result(null, { message: 'Add new product successfully!'});
    })
}

Product.getAllProducts = (null, result => {
    sql.query('SELECT * FROM Products', (err,res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        res = res.map(item => {
            item.specifications = (item.specifications).split('^\n')
            return item
        })
        result(null, res)
    })
})

Product.getProductImages = ((productID, result) => {
    sql.query(`SELECT image FROM Product_image WHERE id_product = '${productID}'`, (err,res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        result(null, res)
    })
})

Product.search = ((keyword, result) => {
    sql.query(`SELECT * FROM Products WHERE product_name = '${keyword}'`, (err,res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        res = res.map(item => {
            item.specifications = (item.specifications).split('^\n')
            return item
        })
        result(null, res)
    })
})

Product.getProductTypes = (null, result => {
    sql.query('SELECT * FROM Products_type;', (err,res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        result(null, res)
    })
})
module.exports = Product