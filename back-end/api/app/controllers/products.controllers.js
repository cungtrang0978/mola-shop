const Product = require('../models/products.model')




/*//Upload route
app.post('/upload', 
});*/

exports.create = (req, res) => {
    //Validate
    // if (!req.body) {
    //     res.status(400).send({
    //         message: "Content cant empty!"
    //     })
    // }
    
    // const Product = {
    //     name: req.body.name,
    // }
    console.log(req)
}

exports.test = (res,req) => {
    console.log(req.file)
}

exports.getProducts = (req, res) => {
    Product.getAllProducts((err, data) => {
        if (err) {
            res.status(500).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}

exports.getNewProducts = (req, res) => {
    Product.getAllProducts((err, data) => {
        if (err) {
            res.status(500).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
           var arrHandle = Array.from(data)
           arrHandle.sort(function(a,b){ 
                if(a === 0) return 1;
                else if(b === 0) return -1;
                else return Date.parse(b.addedDate) - Date.parse(a.addedDate);
            });
            res.send({data: arrHandle, result: { code: 0, message: 'OK' }})
        }
    })
}

exports.getProductImages = (req, res) => {
     //Validate
     if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }
    Product.getProductImages(req.body.productID,(err, data) => {
        if (err) {
            res.status(500).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}

exports.search = (req, res) => {
    //Validate
    if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }
    Product.search(req.body.keyword, (err, data) => {
        if (err) {
            res.status(500).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}

exports.getProductTypes = (req, res) => {
    Product.getProductTypes((err, data) => {
        if (err) {
            res.status(500).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}