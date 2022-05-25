const jwt = require('jsonwebtoken')

module.exports = {
    validateLogin: (req, res, next) => {
        if (!req.body.loginname || !req.body.userpassword) {
            return res.status(400).send({
                data: {  message: 'Please enter user login name and password' },
                result: { code: 1, message: 'Error!' }
            })
        }
        next()
    },
    validateRegister: (req, res, next) => {
        if (!req.body.loginname || !req.body.email || !req.body.username || !req.body.gender || !req.body.userpassword) {
            return res.status(400).send({
                data: {  message: 'Please fill enough information!' },
                result: { code: 1, message: 'Error!' }
            })
        }
        if (req.body.userpassword.trim() !== req.body.confirmpassword.trim()) {
            return res.status(500).send({
                data: { message: 'Password and confirm password not match!'},
                result: { code: 1, message: 'Error!' }
            })
        }
        next()
    },
    vadidateEmail: (req, res, next) => {
        if (!req.body.email) {
            return res.status(400).send({
                data: { message: 'Please enter user email!' },
                result: { code: 1, message: 'Error!' }
            })
        }
        next()
    },
    isLogged: (req, res, next) => {
        try {
            const decoded = jwt.verify(req.headers['authorization'], 'SECRETKEY')
            //console.log(decoded)
            if ((new Date()).getTime() <= decoded.exp) {
                res.user = decoded.id_user
                next()
            }
            else {
                return res.status(401).send({
                    data: {  message: "Token expired!." },
                    result: { code: 1, message: 'Error!' }
                });
            }
        }
        catch (e) {
            return res.status(401).send({
                data: {  message:  e.message || "Some error occurred!." },
                result: { code: 1, message: 'Error!' }
            });
        }
    }
}