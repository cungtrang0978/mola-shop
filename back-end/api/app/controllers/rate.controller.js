const Rate = require('../models/rate.model')

exports.addRate = async (req, res) => {
     //Validate
    if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }

    const rate = new Rate({
        id_user : res.user,
        id_product : req.body.id_product,
        rate : req.body.rate,
        cmt : req.body.cmt
    })

    Rate.addRate(rate, (err,data) => {
        if (err) {
            res.status(400).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}

exports.getProductRate = async (req, res) => {
    //Validate
   if (!req.body) {
       res.status(400).send({
           data: { message: "Content cant empty!" },
           result: { code: 1, message: 'Error!' }
       })
   }

   const productRate = req.body.id_product;

   Rate.getProductRate(productRate, (err,data) => {
    if (err) {
        res.status(400).send({
            data: {  message:  err.message || "Some error occurred." },
            result: { code: 1, message: 'Error!' }
        })
    }
    else {
        res.send({data, result: { code: 0, message: 'OK' }})
    }
    })
}

exports.updateRate = (req,res) => {
     //Validate
   if (!req.body) {
    res.status(400).send({
        data: { message: "Content cant empty!" },
        result: { code: 1, message: 'Error!' }
    })
}

const newRate = {
    id_user: res.user,
    id_product: req.body.id_product,
    rate: req.body.rate,
    cmt: req.body.cmt
}

    Rate.updateRate(newRate, (err,data) => {
        if (err) {
            res.status(400).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}