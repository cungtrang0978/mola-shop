const sql = require('./db')
const customId = require("custom-id")

//constructor
const Rate = function(rate) {
    this.id_rate = customId({}),
    this.id_user = rate.id_user;
    this.id_product = rate.id_product;
    this.rate = rate.rate;
    this.ratedate = new Date();
    this.cmt = rate.cmt;
}

Rate.addRate = (payload, result) => {
    sql.query('INSERT INTO Rating SET ?', payload, (err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        } 
        result(null, { ...payload });
    }) 
}

Rate.getProductRate = (payload, result) => {
    sql.query(`SELECT * FROM Rating WHERE id_product = '${payload}'`,(err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        } 
        result(null, res)
    }) 
}
Rate.updateRate = (payload, result) => {
    var query = '';
    if (payload.rate && payload.cmt) {
        query = `rate = ${payload.rate}, cmt = '${payload.cmt}'`
    }
    else {
        if (payload.rate) {
            query = `rate = ${payload.rate}`
        }
        if (payload.cmt) {
            query = `rate = ${payload.cmt}`
        }
    } 
    sql.query(`UPDATE Rating SET ${query} WHERE id_product = '${payload.id_product}' AND id_user = '${payload.id_user}'`,(err, res) => {
        if (err) {
            console.log('Error: ',err);
            result(err, null)
            return
        } 
        result(null, {message: "Sucess!"})
    }) 
}

module.exports = Rate