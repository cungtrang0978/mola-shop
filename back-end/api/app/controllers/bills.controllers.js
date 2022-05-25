
const Bill = require('../models/bills.model')

exports.create = async (req, res) => {
    //Validate
    if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }
    const newBill = new Bill({
        id_user : res.user,
        total: req.body.total,
        address_delivery : req.body.address_delivery
    })

    Bill.create(newBill, async (err, data) => {
        if (err) {
            res.status(400).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            await Bill.createBillDetails({products: req.body.products, id_bill: data.id_bill}, (err, data) => {
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
    })
}

exports.update = async (req, res) => {
     //Validate
     if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }
    const bill = {
        total : req.body.total,
        bill_status : req.body.bill_status,
        address_delivery: req.body.address_delivery
    }
    const products = req.body.products

    await Bill.update({bill:bill, id: req.body.id_bill}, async (err, data) => {
        if (err) {
            res.status(400).send({
                data: {  message:  err.message || "Some error occurred." },
                result: { code: 1, message: 'Error!' }
            })
        }
        else {
            await Bill.updateBillDetails({products, id:req.body.id_bill}, (err, data) => {
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
            //res.send({data, result: { code: 0, message: 'OK' }})
        }
    })
}

exports.getTotalBill = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }
    Bill.getTotalBill(res.user, (err, data) => {
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

exports.deleteBill = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }
    Bill.deleteBill(req.body.id_bill, (err, data) => {
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

exports.getBillDetails = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            data: { message: "Content cant empty!" },
            result: { code: 1, message: 'Error!' }
        })
    }
    Bill.getBillDetails(req.body.id_bill, (err, data) => {
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