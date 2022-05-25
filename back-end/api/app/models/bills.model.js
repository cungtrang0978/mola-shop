const sql = require('./db')
const customId = require("custom-id")

//Constructor
const Bill = function(bill) {
    this.id_bill = customId({}),
    this.id_user = bill.id_user,
    this.date_order = new Date(),
    this.bill_status = 0,
    this.total = bill.total,
    this.address_delivery = bill.address_delivery
}

Bill.create = (newBill, result) => {
    sql.query('INSERT INTO Bills SET ?', newBill, (err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        result(null, { id_bill: newBill.id_bill });
    })
}

Bill.createBillDetails = async (payload, result) => {
    const id_bill = payload.id_bill
    var query = ''
    payload.products.forEach(element => {
        query += `('${id_bill}', '${element.id}', ${element.quanlity}),`
    });
    query = query.slice(0, query.length - 1)
    //console.log(`INSERT INTO Bill_details VALUES ${query}`)
    await sql.query(`INSERT INTO Bill_details VALUES ${query}`, (err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        result(null, { message: "Bill was added successfully!" });
    })
    //result(null, { message: "Bill was updated successfully!" });
}

Bill.update = (bill, result) => {
    console.log(`UPDATE Bills SET ? WHERE id_bill = '${bill.id}'`, bill.bill)
    sql.query(`UPDATE Bills SET ? WHERE id_bill = '${bill.id}'`, bill.bill, (err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        console.log("update bill");
        result(null, { message: "Bill was updated successfully!" });
    })
}

Bill.updateBillDetails = async (payload, result) => {
    if (payload.products.length > 0) {
        const id = payload.id;
        const count = payload.products.length;
        var execTime = 0;

        for (let i = 0; i < payload.products.length; i++ ) {
            try {
                // console.log(`UPDATE Bill_details SET quanlity = ${payload.products[i].quanlity} WHERE id_bill = '${id}' AND id_product = '${payload.products[i].id}'`)
                await sql.query(`UPDATE Bill_details SET quanlity = ${payload.products[i].quanlity} WHERE id_bill = '${id}' AND id_product = '${payload.products[i].id}'`)
            }
            catch (e) {
                result(e, null)
            }
            execTime++
        }
        if(execTime === count) {
            result(null, { message: "Bill was updated successfully!" });
        }
        else {
            result({ error: "Something wrong!"}, null)
        }
    }
    else {
        result(null, { message: "Bill was updated successfully!" });
    }
   
}

Bill.getTotalBill = (userID, result) => {
    sql.query(`SELECT * FROM Bills WHERE id_user = '${userID}'`,(err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        result(null, res);
    })
}

Bill.getBillDetails = (id_bill, result) => {
    sql.query(`SELECT * FROM Bill_details WHERE id_bill = '${id_bill}'`, (err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        result(null, res);
    })
}

Bill.deleteBill = (id_bill, result) => {
    sql.query(`DELETE FROM Bill_details WHERE id_bill = '${id_bill}'`,async (err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        }
        else {
            await sql.query(`DELETE FROM Bills WHERE id_bill = '${id_bill}'`,(err, res) => {
                if (err) {
                    console.log('Error: ',err);
                    result(err, null)
                    return
                }
                result(null, {message: `Delete bill ${id_bill} successfully!`});
            })
        }
        
    })
}
module.exports = Bill